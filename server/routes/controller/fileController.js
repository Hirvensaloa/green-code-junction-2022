import {
  GoogleAuth,
  Storage,
} from 'https://googleapis.deno.dev/v1/storage:v1.ts';

const serviceAccount = JSON.parse(
  await Deno.readTextFile(`${Deno.cwd()}/serviceaccount.json`)
);

const client = await new GoogleAuth().getApplicationDefault();

// Upload file to Google Cloud Storage
const storage = new Storage(client.credential);

console.log(storage);

const bucket = await storage.bucketsGet('green-code-bucket');

const uploadFile = async ({ request, response }) => {
  const body = request.body({ type: 'form-data' });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];

  // Read serviceaccount.json file to object
  const serviceAccount = JSON.parse(
    await Deno.readTextFile(`${Deno.cwd()}/serviceaccount.json`)
  );

  const client = await new GoogleAuth().getApplicationDefault();
  console.log(client);

  // Upload file to Google Cloud Storage
  const storage = new Storage({
    client,
  });

  console.log(storage);

  const bucket = await storage.bucketsGet('green-code-bucket');

  console.log(bucket);

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
