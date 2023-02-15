const {Router} = require('express');
const router = Router();
const { checkAuth } = require("../middleware/authMiddleware");
const {buyblog_get, buyBlog_paid_get,deletePaid_get,editblogpaid_get,editblogpaid_put} = require("../controllers/paidblogController")

router.get("/buy",buyblog_get)
router.get("/:id",checkAuth,buyBlog_paid_get)
router.get("/delete/:id", deletePaid_get);
router.get("/edit/:id", editblogpaid_get);
router.put("/edit/:id", editblogpaid_put);

module.exports = router;