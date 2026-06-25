const socket = io();

const joinBtn =
    document.getElementById("joinBtn");

const usernameInput =
    document.getElementById("username");

const joinContainer =
    document.getElementById("joinContainer");

const chatContainer =
    document.getElementById("chatContainer");

const onlineUsers =
    document.getElementById("onlineUsers");

const sendBtn =
    document.getElementById("sendBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const messageInput =
    document.getElementById("messageInput");

const messagesContainer =
    document.getElementById("messages");

let currentUsername = "";

/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

function formatTime(timestamp) {

    const date = new Date(timestamp);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

}

function addSystemMessage(message) {

    const div =
        document.createElement("div");

    div.className =
        "message system-message";

    div.textContent = message;

    messagesContainer.appendChild(div);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;
}

function addChatMessage(
    username,
    message,
    createdAt
) {

    const isMine =
        username === currentUsername;

    const div =
        document.createElement("div");

    div.className =
        `message ${
            isMine
                ? "my-message"
                : "other-message"
        }`;

    div.innerHTML = `
        <div class="message-header">

            <span class="message-user">
                ${username}
            </span>

            <span class="message-time">
                ${formatTime(createdAt)}
            </span>

        </div>

        <div class="message-content">
            ${message}
        </div>
    `;

    messagesContainer.appendChild(div);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;
}

/* -------------------------------- */
/* Join Chat                        */
/* -------------------------------- */
/* -------------------------------- */
/* Auto Login                       */
/* -------------------------------- */

function joinChat(username) {

    // console.log("Joining chat as:", username);

    currentUsername = username;

    socket.emit("join-chat", {
        username,
    });

    joinContainer.style.display = "none";
    chatContainer.style.display = "flex";
}

/* -------------------------------- */
/* Join Button                      */
/* -------------------------------- */

joinBtn.addEventListener(
    "click",
    () => {

        const username =
            usernameInput.value.trim();

        if (!username) {

            alert(
                "Please enter a username."
            );

            return;
        }

        joinChat(username);
    }
);

/* -------------------------------- */
/* Send Message                     */
/* -------------------------------- */

sendBtn.addEventListener(
    "click",
    () => {

        const message =
            messageInput.value.trim();

        if (!message) {
            return;
        }

        socket.emit(
            "send-message",
            {
                message,
            }
        );

        messageInput.value = "";

        messageInput.focus();
    }
);

/* -------------------------------- */
/* Enter Key                        */
/* -------------------------------- */

messageInput.addEventListener(
    "keydown",
    (e) => {

        if (e.key === "Enter") {

            sendBtn.click();

        }

    }
);

/* -------------------------------- */
/* Logout                           */
/* -------------------------------- */
logoutBtn.addEventListener("click",() => {

        socket.disconnect();

        currentUsername = "";

        usernameInput.value = "";

        location.reload();

    });




    socket.onAny((event, ...args) => {
        // console.log("EVENT:", event);
        // console.log("DATA:", args);
});




/* ----------------------------- */
/* Chat History                  */
/* ----------------------------- */

socket.on("chat-history", (messages) => {

    messagesContainer.innerHTML = "";

    messages.reverse();

    messages.forEach((msg) => {

        addChatMessage(
            msg.username,
            msg.content,
            msg.createdAt
        );

    });

});

/* ----------------------------- */
/* Receive Message               */
/* ----------------------------- */

socket.on("receive-message", (data) => {

    addChatMessage(
        data.username,
        data.message,
        data.createdAt
    );

});

/* ----------------------------- */
/* Online Users                  */
/* ----------------------------- */

socket.on("online-users", (data) => {

    onlineUsers.textContent =
        `Online: ${data.count}`;

});

/* ----------------------------- */
/* User Joined                   */
/* ----------------------------- */

socket.on("user-joined", (data) => {

    addSystemMessage(
        data.message
    );

});


socket.on("user-left",(data)=>{

    addSystemMessage(data.message);

});