const db = require('../services/database');

const rsvpToEvent = (userId, eventId, status = 'attending') => new Promise((resolve, reject) => {
    db.query(
        `INSERT INTO user_events (user_id, event_id, status)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [userId, eventId, status],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

const getUserEventRSVPs = (userId) => new Promise((resolve, reject) => {
    db.query(
        `SELECT ue.*, e.name AS event_name, e.start, e.end
         FROM user_events ue
         JOIN events e ON ue.event_id = e.id
         WHERE ue.user_id = ?`,
        [userId],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }
    );
});

module.exports = {
    rsvpToEvent,
    getUserEventRSVPs
};
