const { S3 } = require("aws-sdk");
const uuid = require("uuid");

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();
  const params = files.map((file) => {
    let fileName = file.originalname;
    fileName = fileName.replace(/\s+/g, "-").toLowerCase();
    return {
      Bucket: process.env.AWS_BUCKET,
      Key: `nodejs-upskillfest-rahul/${uuid.v4()}-${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
  });
  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
