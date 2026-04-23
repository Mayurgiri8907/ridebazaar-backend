const multerS3 = require("multer-s3");
const multer = require("multer");
// const AWS = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");

// configure AWS

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
});

// multer + S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `images/${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;