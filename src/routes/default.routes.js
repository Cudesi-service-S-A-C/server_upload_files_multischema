const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.send({ "response": "Fuciona Correctamente" });
});

module.exports = router;