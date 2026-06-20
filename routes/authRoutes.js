const router = require("express").Router();
const { register, login, refresh, getMe, logout } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", protect, getMe);
router.post("/logout", logout);

module.exports = router;
