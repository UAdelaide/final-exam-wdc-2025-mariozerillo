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

        const [result] = await db.execute(fetchDogsSql);

        res.json(result);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/walkrequests/open', async(req, res, next) => {
    try {
        let db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
