const db = require('../services/database');

const getResourcesByGroupId = (groupId) => new Promise((resolve, reject) => {
    db.query(
        `SELECT r.*, u.first_name, u.last_name
         FROM resources r
         JOIN users_ccl2 u ON r.uploaded_by = u.id
         WHERE r.group_id = ?`,
        [groupId],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }
    );
});

const addResource = (groupId, data) => new Promise((resolve, reject) => {
    const { name, file_path, file_size, file_type, uploaded_by } = data;
    db.query(
        `INSERT INTO resources (group_id, name, file_path, file_size, file_type, uploaded_by)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [groupId, name, file_path, file_size, file_type, uploaded_by],
        (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        }
    );
});

const deleteResource = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM resources WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
    });
});

module.exports = {
    getResourcesByGroupId,
    addResource,
    deleteResource
};
