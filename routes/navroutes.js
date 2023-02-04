const {Router} = require('express');
const router = Router();
const {checkAuth} = require("../middleware/authMiddleware");
const { send_post, send_get, contact_get ,blog_get } = require('../controllers/navController');

router.get("/blog" ,checkAuth, blog_get)
router.get("/contact" , contact_get)
router.get("/send" , send_get)
router.post("/send" ,send_post )

module.exports = router;