const {Router} = require('express');
const router = Router();
const {checkAuth} = require("../middleware/authMiddleware");

router.get("/blog" ,checkAuth, (req,res)=>{
    res.render("blogs");
})

module.exports = router;