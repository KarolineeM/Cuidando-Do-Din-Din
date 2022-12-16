const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const controllers = require("../controllers/inforController");
const authcontroller = require("../controllers/authController");

const { checkAuth } = require("../middlewares/auth")

router.get("/all", controller.getAll);
router.post("/createUser", controller.createUser);
router.post("/login", authcontroller.login);

router.get("/all-mes", controllers.all);
router.get("/searchDate/:mes", controllers.searchData);
router.get("/valores/:mes", controllers.calcularValores);
router.post("/create", controllers.create);
router.put("/update/:userId", controllers.update);
router.delete("/delete/:userId", controllers.remove);

module.exports = router;
