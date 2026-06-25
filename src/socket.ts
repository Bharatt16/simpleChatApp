import { Server, Socket } from "socket.io";
import { JoinChatPayload } from "./types/socket.js";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import { messages } from "./db/schema.js";
import { desc } from "drizzle-orm";

const onlineUsers = new Map<string, string>();

export function initializeSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    // console.log(`User connected : ${socket.id}`);

    socket.on("join-chat", async (data) => {

        // console.log("JOIN EVENT RECEIVED");

    // console.log(data);

      await db.insert(users).values({
        username: data.username,
      });

      const previousMessages = await db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))
        .limit(50);

      socket.emit("chat-history", previousMessages);

      onlineUsers.set(socket.id, data.username);

      // console.log("New user joined");

      // console.log({
      //   socketId: socket.id,
      //   username: data.username,
      // });

      io.emit("online-users", {
        count: onlineUsers.size,
      });

      io.emit("user-joined", {
        message: `${data.username} joined the chat`,
      });
    });

   socket.on("disconnect", () => {

    const username =
        onlineUsers.get(socket.id);

    if(username){

        // console.log(`${username} left the chat`);

        io.emit("user-left",{
            message:`${username} left the chat`
        });

        onlineUsers.delete(socket.id);

    }

    io.emit("online-users",{
        count:onlineUsers.size
    });

});

    socket.on("send-message", async (data) => {
      const username = onlineUsers.get(socket.id);

      if (!username) {
        // console.log("User not found for socket id:", socket.id);
        return;
      }

      const [newMessage] = await db
        .insert(messages)
        .values({
          username,
          content: data.message,
        })
        .returning();

      io.emit("receive-message", {
        username,
        message: data.message,
        createdAt: newMessage.createdAt,
      });
    });
  });
}
