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
router.get("/searchDate", controllers.searchData);
router.post("/create", controllers.create);
router.put("/update/:id", controllers.update);
router.delete("/delete/:id", controllers.remove);

module.exports = router;
