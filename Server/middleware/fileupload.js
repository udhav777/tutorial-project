const multer = require("multer");
const path = require("path");

const storege = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storege,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg ,png & jpeg can upload");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});

module.exports = upload;
