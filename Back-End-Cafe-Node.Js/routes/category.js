const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('./services/authentication');
var checkRole = require('./services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body; // Corrected parameter name to 'category'
    query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category Added Successfully" });

        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select * from category order by name"; // Added space after *
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        } else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body; // Corrected parameter name to 'category'
    var query = "update category set name=? where id=?";
    connection.query(query, [category.name, category.id], (err, results) => { // Corrected parameter name to 'category'
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category id does not found" });
            }
            return res.status(200).json({ message: "Category Update Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;