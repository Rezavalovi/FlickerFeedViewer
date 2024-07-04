require("dotenv").config();

const express = require("express");
const cors = require("cors");
const photoRoutes = require("./routes/fetchPhotoRoute");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(photoRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
