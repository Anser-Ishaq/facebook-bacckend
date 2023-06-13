const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const getFBInfo = require("fb-downloader");
app.use(bodyParser.json());
const fbDownloader = require("fb-downloader-scrapper");
const getFBInfo = require("@xaviabot/fb-downloader");
var cors = require("cors");
// const getInfo = require('fb-video-downloader'); not working
app.use(cors());
const fbvid = require("fbvideos");
const fbdl = require("fbdl-core");
const fs = require("fs");
const getDownloadUrl = require("facebook-video-downloader");
const snapsave = require("snapsave-downloader");
const tools = require("tools-fb");
const instagramGetUrl = require("instagram-url-direct");
const { fbdl1, fbdl2 } = require("vihangayt-fbdl");

// all are working the same way
// npm i vihangayt-fbdl
// npm i snapsave
// npm i @xaviabot/fb-downloader

app.get("/", (req, res) => {
  const videoUrl = req.query.url;
  console.log("Downloading video", videoUrl);
  getFBInfo(`${videoUrl}`)
    .then((result) => {
      console.log("result for the videos", result);
      const videoHDLink = result.hd;
      const videoSDLink = result.sd;
      const videoThumbnailLink = result.thumbnail;
      const videoData = {
        hd: videoHDLink,
        sd: videoSDLink,
        thumbnail: videoThumbnailLink,
      };
      console.log("video data:", videoData);

      return res.send(videoData);
    })
    .catch((error) => {
      console.log("Error:", error);
      return res.status(500).send("Internal Server Error");
    });
});

app.get("/fb", async (req, res) => {
  const videoUrl2= req.query.url;
  console.log("downloading video", videoUrl2)
  const video = "https://fb.watch/k-hk1KV8on/";
  let URL = await snapsave(`${videoUrl2}`);
  console.log(URL);
  res.send(URL)
  // try {
  //   const video = "https://fb.watch/k-hk1KV8on/";
  // let response = await fbdl2('https://fb.watch/k-hk1KV8on/')
  // let response = await getDownloadUrl('https://fb.watch/k-hk1KV8on/')
  //   console.log(response);
  //   res.send(response);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('An error occurred');
  // }
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
