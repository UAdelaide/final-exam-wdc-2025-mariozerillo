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

        const fetchDogsSql = 'SELECT name';

    } catch (error) {
        return res.sendStatus(500).json('Internal server error.');
    }
});

module.exports = router;
