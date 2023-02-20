const {Router} = require('express');
const router = Router();
const {checkAuth} = require("../middleware/authMiddleware");
const { send_post, send_get, contact_get ,blog_get,get_quote,sendquote_post } = require('../controllers/navController');

router.get("/blog", blog_get)
router.get("/contact" , contact_get)
router.get("/send" , send_get)
router.post("/send" ,send_post )
router.post("/sendquote" ,sendquote_post )
router.get("/getquote" , get_quote)

module.exports = router;