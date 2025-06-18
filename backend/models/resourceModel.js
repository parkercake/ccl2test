const { pool } = require('../services/database.js');

const getResourcesByGroupId = async (groupId) => {
    const [rows] = await pool.query(
        `SELECT r.*, u.first_name, u.last_name
         FROM resources r
         JOIN users_ccl2 u ON r.uploaded_by = u.id
         WHERE r.group_id = ?`,
        [groupId]
    );
    return rows;
};

const addResource = async (groupId, data) => {
    const { name, file_path, file_size, file_type, uploaded_by } = data;

    const [result] = await pool.query(
        `INSERT INTO resources (group_id, name, file_path, file_size, file_type, uploaded_by)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [groupId, name, file_path, file_size, file_type, uploaded_by]
    );

    return result.insertId;
};

const deleteResource = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM resources WHERE id = ?',
        [id]
    );
    return result;
};

module.exports = {
    getResourcesByGroupId,
    addResource,
    deleteResource
};
