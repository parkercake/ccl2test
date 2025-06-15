const db = require('../services/database');

const getMembersByGroupId = (groupId) => new Promise((resolve, reject) => {
    db.query(
        `SELECT users_ccl2.id, users_ccl2.first_name, users_ccl2.last_name, users_ccl2.email, ug.role, ug.joined_at
         FROM user_groups ug
         JOIN users_ccl2 ON users_ccl2.id = ug.user_id
         WHERE ug.group_id = ?`,
        [groupId],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }
    );
});

const addMemberToGroup = (groupId, userId, role = 'member') => new Promise((resolve, reject) => {
    db.query(
        'INSERT INTO user_groups (user_id, group_id, role) VALUES (?, ?, ?)',
        [userId, groupId, role],
        (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        }
    );
});

const updateMemberRole = (groupId, userId, role) => new Promise((resolve, reject) => {
    db.query(
        'UPDATE user_groups SET role = ? WHERE group_id = ? AND user_id = ?',
        [role, groupId, userId],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

const removeMemberFromGroup = (groupId, userId) => new Promise((resolve, reject) => {
    db.query(
        'DELETE FROM user_groups WHERE group_id = ? AND user_id = ?',
        [groupId, userId],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

module.exports = {
    getMembersByGroupId,
    addMemberToGroup,
    updateMemberRole,
    removeMemberFromGroup
};
