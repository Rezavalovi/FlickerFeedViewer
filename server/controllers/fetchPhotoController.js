const axios = require("axios");

class PhotoController {
  constructor() {
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }

  //get photos from API
  async fetchPhotos(tags, retries = 3, delay = 1000) {
    try {
      const response = await axios.get(
        "https://api.flickr.com/services/feeds/photos_public.gne",
        {
          params: {
            format: "json",
            nojsoncallback: 1,
            tags: tags || "",
          },
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Flickr Feed App",
          },
        },
      );
      // console.log("Headers:", response.headers);
      return response.data;
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        //   console.log(`Rate limit terlampaui, mencoba lagi dalam ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetchPhotos(tags, retries - 1, delay * 2);
      } else {
        throw error;
      }
    }
  }

  async getPhotos(req, res) {
    try {
      const data = await this.fetchPhotos(req.query.tags);
      res.json(data);
    } catch (error) {
      // console.log(data);
      res.status(500).send("Error fetching data");
    }
  }
}

module.exports = new PhotoController();
