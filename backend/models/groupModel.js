const { pool } = require('../services/database.js');

const getGroups = async () => {
    const [rows] = await pool.query('SELECT * FROM `groups`');
    return rows;
};

const getGroupById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM `groups` WHERE id = ?', [id]);
    return rows[0] || null;
};

const addGroup = async (groupData) => {
    const { name, description } = groupData;
    const [result] = await pool.query(
        'INSERT INTO `groups` (name, description) VALUES (?, ?)',
        [name, description]
    );
    return result.insertId;
};

const updateGroup = async (id, groupData) => {
    const { name, description } = groupData;
    const [result] = await pool.query(
        'UPDATE `groups` SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
    );
    return result;
};

const deleteGroup = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM `groups` WHERE id = ?',
        [id]
    );
    return result;
};

module.exports = {
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup
};