const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const { format } = require("util");
const uuid = require("uuid");

exports.googleCloudUpload = async (files) => {
  const promises = [];
  files.map((file) => {
    promises.push(
      new Promise((resolve, reject) => {
        let fileName = file.originalname;
        fileName = fileName.replace(/\s+/g, "-").toLowerCase();
        const gcsFileName = `nodejs-upskillfest-rahul/${uuid.v4()}-${fileName}`;
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(gcsFileName);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });
        blobStream.on("error", (err) => {
          reject(err);
        });

        // Make an asynchronous call and either resolve or reject

        blobStream.on("finish", () => {
          blob.makePublic().then(() => {
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            resolve(publicUrl);
          });
        });
        blobStream.end(file.buffer);
      })
    );
  });
  return await Promise.all(promises);
};
