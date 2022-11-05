const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'junction-2022',
  keyFilename: 'serviceaccount.json',
});
const bucket = storage.bucket('green-code-bucket');

async function generateReadSignedUrl(filename) {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000,
  };

  const url = await bucket.file(filename).getSignedUrl(options);

  return url;
}

async function generateUploadSignedUrl(contentType, filename) {
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  };

  const url = await bucket.file(filename).getSignedUrl(options);

  return url;
}

module.exports = {
  generateReadSignedUrl,
  generateUploadSignedUrl,
};
