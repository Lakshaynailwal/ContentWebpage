const { Router } = require("express");
const express = require('express');
const { create_get, create_post, showblog_get, delete_get, editblog_get, editblog_put, comment_post, upload_image, comment_reply } = require("../controllers/blogController");
const { checkAuth } = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../static/images"));
    },
    filename: function (req, file, cb) {
        // console.log(file)
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({ storage: storage });

router.get("/create", checkAuth, create_get);
router.post("/create", checkAuth, create_post);
router.get("/:id", showblog_get);
router.get("/edit/:id", editblog_get);
router.get("/delete/:id", delete_get);
router.put("/edit/:id", editblog_put);
router.post("/comment", comment_post);
router.post("/reply", comment_reply);
router.post("/upload", checkAuth, upload.single('image'), upload_image)

module.exports = router;