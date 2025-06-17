const db = require('../services/database.js').config;

const getEventsByGroupId = (groupId) => new Promise((resolve, reject) => {
    db.query(
        'SELECT * FROM events WHERE group_id = ? ORDER BY start ASC',
        [groupId],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }
    );
});

const addEvent = (groupId, data) => new Promise((resolve, reject) => {
    const { name, start, end } = data;
    db.query(
        `INSERT INTO events (group_id, name, start, end)
         VALUES (?, ?, ?, ?)`,
        [groupId, name, start, end],
        (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        }
    );
});

const updateEvent = (eventId, data) => new Promise((resolve, reject) => {
    const { name, start, end } = data;
    db.query(
        `UPDATE events SET name = ?, start = ?, end = ? WHERE id = ?`,
        [name, start, end, eventId],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

const deleteEvent = (eventId) => new Promise((resolve, reject) => {
    db.query(
        'DELETE FROM events WHERE id = ?',
        [eventId],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

module.exports = {
    getEventsByGroupId,
    addEvent,
    updateEvent,
    deleteEvent
};
