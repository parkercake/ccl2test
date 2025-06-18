const { pool } = require('../services/database.js');

const getMembersByGroupId = async (groupId) => {
    const [rows] = await pool.query(
        `SELECT users_ccl2.id, users_ccl2.first_name, users_ccl2.last_name, users_ccl2.email, ug.role, ug.joined_at
         FROM user_groups ug
         JOIN users_ccl2 ON users_ccl2.id = ug.user_id
         WHERE ug.group_id = ?`,
        [groupId]
    );
    return rows;
};

const addMemberToGroup = async (groupId, userId, role = 'member') => {
    const [result] = await pool.query(
        'INSERT INTO user_groups (user_id, group_id, role) VALUES (?, ?, ?)',
        [userId, groupId, role]
    );
    return result.insertId;
};

const updateMemberRole = async (groupId, userId, role) => {
    const [result] = await pool.query(
        'UPDATE user_groups SET role = ? WHERE group_id = ? AND user_id = ?',
        [role, groupId, userId]
    );
    return result;
};

const removeMemberFromGroup = async (groupId, userId) => {
    const [result] = await pool.query(
        'DELETE FROM user_groups WHERE group_id = ? AND user_id = ?',
        [groupId, userId]
    );
    return result;
};

module.exports = {
    getMembersByGroupId,
    addMemberToGroup,
    updateMemberRole,
    removeMemberFromGroup
};
