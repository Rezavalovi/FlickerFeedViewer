const express = require("express");
const { getPhotos } = require("../controllers/fetchPhotoController");

const router = express.Router();

router.get("/api/photos", getPhotos);

module.exports = router;
