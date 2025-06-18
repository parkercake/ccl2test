const { pool } = require('../services/database.js');

const rsvpToEvent = async (userId, eventId, status = 'attending') => {
    const [result] = await pool.query(
        `INSERT INTO user_events (user_id, event_id, status)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [userId, eventId, status]
    );
    return result;
};

const getUserEventRSVPs = async (userId) => {
    const [rows] = await pool.query(
        `SELECT ue.*, e.name AS event_name, e.start, e.end
         FROM user_events ue
         JOIN events e ON ue.event_id = e.id
         WHERE ue.user_id = ?`,
        [userId]
    );
    return rows;
};

module.exports = {
    rsvpToEvent,
    getUserEventRSVPs
};