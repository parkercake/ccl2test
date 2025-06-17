const db = require('../services/database.js').config;

const getGroups = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM `groups`', (err, results) => {
        if (err) return reject(err);
        resolve(results);
    });
});

const getGroupById = (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM `groups` WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
    });
});

const addGroup = (groupData) => new Promise((resolve, reject) => {
    const { name, description } = groupData;
    db.query(
        'INSERT INTO `groups` (name, description) VALUES (?, ?)',
        [name, description],
        (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        }
    );
});

const updateGroup = (id, groupData) => new Promise((resolve, reject) => {
    const { name, description } = groupData;
    db.query(
        'UPDATE `groups` SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }
    );
});

const deleteGroup = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM `groups` WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
    });
});

module.exports = {
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup
};