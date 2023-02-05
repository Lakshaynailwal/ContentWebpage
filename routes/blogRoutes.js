const {Router} = require("express");
const { create_get, create_post, showblog_get,delete_get ,editblog_get, editblog_put } = require("../controllers/blogController");
const { checkAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/create",checkAuth,create_get);
router.post("/create" ,checkAuth,create_post);
router.get("/:id",showblog_get);
router.get("/edit/:id",editblog_get);
router.get("/delete/:id",delete_get);
router.put("/edit/:id",editblog_put)

module.exports = router;