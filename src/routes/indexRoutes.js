const router = require('express').Router();

router.get("/", (req, res) => {
    res.send({
        "versao": "1.0",
        "titulo": "projeto final",
        "descricao": ""
    })
})

module.exports = router;

