const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

exports.checkAuth = (req, res, next) => {

    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: "Sem autorização",
            statusCode: 401
        });
    }
    const token = authHeader.split('')[1];

    if (!token) {
        return res.status(401).send({
            message: error.message
        })
    }
    try {
        jwt.verify(token, SECRET, (error) => {
            if (error) {
                return res.status(401).send({
                    message: "Não autorizado(a)!"
                })
            }
            next();
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })

    }

    module.exports = token;
}

