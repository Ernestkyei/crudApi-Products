const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //swagger.tags = [`hello  world`]
    res.send('Hello world!');
});


router.use('/products', require('./products'));
module.exports = router;
