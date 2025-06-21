var express = require('express');
var router = express.Router();

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
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;
