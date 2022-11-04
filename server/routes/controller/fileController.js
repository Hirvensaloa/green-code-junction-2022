import { Storage } from 'https://googleapis.deno.dev/v1/storage:v1.ts';
import { GoogleAuth } from 'https://googleapis.deno.dev/v1/storage:v1.ts';

const uploadFile = async ({ request, response }) => {
  const body = request.body({ type: 'form-data' });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];

  const client = new GoogleAuth().fromJSON('serviceaccount.json');
  console.log(client);

  // Upload file to Google Cloud Storage
  const storage = new Storage({
    client,
    baseUrl: 'https://storage.googleapis.com',
  });

  console.log(storage);

  const bucket = storage.bucket('my-bucket-name');

  // Uploads a local file to the bucket
  await bucket.upload(filePath, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  response.body = { success: true };
  response.status = 200;
};

export { uploadFile };
