const express = require('express');
const router = express.Router();
const {getRecommendations} = require('../controllers/mainController');

router.get('/', (req, res) => {
    res.send('Welcome to the main route!');
});

router.post('/recommendations', getRecommendations);
module.exports = router;