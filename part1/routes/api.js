var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dogs', async(req, res, next) => {
    try {
        let db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });

        const fetchDogsSql = 'SELECT d.name, d.size, (SELECT u.username FROM Users AS u WHERE d.owner_id = u.user_id) AS owner_username FROM Dogs AS d';

        db.Promise()

    } catch (error) {
        return res.sendStatus(500).json('Internal server error.');
    }
});

module.exports = router;
