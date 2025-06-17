import { useEffect, useState } from "react";
import { getResources } from "../services/resourcesApi";
import { useParams } from "react-router-dom";
import * as api from "../services/resourcesApi";

export default function GroupResourcesPage() {
    const { groupId } = useParams();
    const [resources, setResources] = useState([]);
    const [form, setForm] = useState({ name: "", file: null });

    useEffect(() => {
        api.getResources(groupId).then(setResources);
    }, [groupId]);

    const handleAdd = async () => {
        console.log("Uploading to group:", groupId);
        if (!form.file) {
            alert("Please choose a file to upload.");
            return;
        }

        try {
            const response = await api.addResource(groupId, form);
            if (response.ok) {
                setForm({ name: "", file: null });
                const updatedResources = await api.getResources(groupId);
                setResources(updatedResources);
            } else {
                console.error("Upload failed");
            }
        } catch (err) {
            console.error("Error during upload", err);
        }
    };

    return (
        <div>
            <h3>Resources</h3>
            <ul>
                {resources.map(r => (
                    <li key={r.id}>
                        {r.name} by {r.first_name || "Unknown"}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="File name (optional)"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <label>
                File:
                <input
                    type="file"
                    name="file"
                    onChange={e => setForm({ ...form, file: e.target.files[0] })}
                />
            </label>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}