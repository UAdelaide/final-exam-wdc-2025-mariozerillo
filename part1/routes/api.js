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

        const fetchDogsSql = 'SELECT d.name AS dog_name, d.size, (SELECT u.username FROM Users AS u WHERE d.owner_id = u.user_id) AS owner_username FROM Dogs AS d';

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

        const fetchOpenRequestsSql = `
            SELECT
                w.request_id,
                (SELECT d.name FROM Dogs AS d WHERE w.dog_id = d.dog_id) AS dog_name,
                w.requested_time, w.duration_minutes, w.location,
                (SELECT u.username FROM Users AS u JOIN Dogs AS d ON u.user_id = d.owner_id WHERE w.dog_id = d.dog_id) AS owner_username
            FROM WalkRequests AS w
            WHERE w.status = 'open'`;

        const [result] = await db.execute(fetchOpenRequestsSql);

        res.json(result);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/walkers/summary', async(req, res, next) => {
    try {
        let db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });
    } catch (error) {
        
    }
});

module.exports = router;
