const { S3 } = require("aws-sdk");

exports.s3Uploadv2 = async (file) => {
  var fileName = file.originalname;
  fileName = fileName.replace(/\s+/g, "-").toLowerCase();
  const s3 = new S3();
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `nodejs-upskillfest-rahul/${fileName}`,
    Body: file.buffer,
    ACL: "public-read",
  };
  return await s3.upload(params).promise();
};
