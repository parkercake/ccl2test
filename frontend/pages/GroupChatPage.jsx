// src/pages/GroupChatPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import * as api from "../services/messagesApi.js";
import { useUser } from "../src/context/UserContext";

const socket = io("http://localhost:3000");

export default function GroupChatPage() {
    const { groupId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useUser();

    useEffect(() => {
        api.getMessages(groupId).then(setMessages);
        socket.emit("joinGroup", groupId);
        socket.on("newMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => socket.off("newMessage");
    }, [groupId]);

    const handleSend = async () => {
        if (!input.trim() || !user) return;

        const messageData = {
            groupId,
            name: input,
            first_name: user.first_name,
            last_name: user.last_name,
            user_id: user.id,
        };

        await api.sendApiMessage(groupId, input);
        socket.emit("sendMessage", messageData);
        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`message ${m.user_id === user?.id ? "sent" : "received"}`}
                    >
                        <div className="message-bubble">
                            <b>{m.first_name}:</b> {m.name}
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input-container">
                <input
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="send-btn" onClick={handleSend}>➤</button>
            </div>
        </div>
    );
}
