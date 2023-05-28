var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from Fluxo Caixa API!' });
});

module.exports = router;
