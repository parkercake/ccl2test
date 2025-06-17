import { useEffect, useState } from "react";
import * as api from "../services/apiService";

function MessagesPage({ groupId = 1 }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const fetchMessages = async () => {
        const data = await api.getMessages(groupId);
        setMessages(data || []);
    };

    const sendMessage = async () => {
        await api.sendMessage(groupId, text);
        setText("");
        fetchMessages();
    };

    useEffect(() => { fetchMessages(); }, [groupId]);

    return (
        <div>
            <h2>Messages for Group {groupId}</h2>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>

            <ul>
                {messages.map(m => (
                    <li key={m.id}>{m.first_name}: {m.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MessagesPage;
