const express = require("express");
const PhotoController = require("../controllers/fetchPhotoController");

const router = express.Router();

router.get("/api/photos", PhotoController.getPhotos);

module.exports = router;
