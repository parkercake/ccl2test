const { pool } = require('../services/database.js');

const getEventsByGroupId = async (groupId) => {
    const [rows] = await pool.query(
        'SELECT * FROM events WHERE group_id = ? ORDER BY start ASC',
        [groupId]
    );
    return rows;
};

const getEventsByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT e.*, ue.status, ue.joined_at
         FROM events e
         JOIN user_events ue ON e.id = ue.event_id
         WHERE ue.user_id = ?
         ORDER BY e.start ASC`,
        [userId]
    );
    return rows;
};

const addEventToGroup = async (groupId, data) => {
    const { name, start, end } = data;
    const [result] = await pool.query(
        `INSERT INTO events (group_id, name, start, end)
         VALUES (?, ?, ?, ?)`,
        [groupId, name, start, end]
    );
    return result.insertId;
}

const addEventToUser = async (userId, eventId, status = 'attending') => {
    const [result] = await pool.query(
        `INSERT INTO user_events (user_id, event_id, status)
         VALUES (?, ?, ?)`,
        [userId, eventId, status]
    );
    return result;
};

const updateEvent = async (eventId, data) => {
    const { name, start, end } = data;
    const [result] = await pool.query(
        `UPDATE events SET name = ?, start = ?, end = ? WHERE id = ?`,
        [name, start, end, eventId]
    );
    return result;
};

const deleteEvent = async (eventId) => {
    const [result] = await pool.query(
        'DELETE FROM events WHERE id = ?',
        [eventId]
    );
    return result;
};

module.exports = {
    getEventsByGroupId,
    getEventsByUserId,
    addEventToGroup,
    addEventToUser,
    updateEvent,
    deleteEvent
};