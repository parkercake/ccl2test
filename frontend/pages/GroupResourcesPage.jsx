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
        <div className="dashboard-content">
            <h3 className="section-title">Resources</h3>

            <div className="resource-upload-row">
                <input
                    type="text"
                    placeholder="File name (optional)"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="file"
                    onChange={e => setForm({ ...form, file: e.target.files[0] })}
                />
                <button className="auth-btn" onClick={handleAdd}>Add</button>
            </div>

            <div className="resources-list">
                {resources.map(r => (
                    <div key={r.id} className="resource-item">
                        <div className="resource-info">
                            <div className="resource-name">{r.name}</div>
                            <div className="resource-date">Uploaded by {r.first_name || "Unknown"}</div>
                        </div>
                        <div className="file-type-badge">file</div>
                    </div>
                ))}
            </div>
        </div>
    );
}