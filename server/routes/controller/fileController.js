import {
  addAttachment,
  deleteAttachment,
} from '../../service/uploadService.js';
import { readableStreamFromReader } from 'https://deno.land/std/streams/conversion.ts';

const uploadFile = async ({ request, response, user }) => {
  const body = request.body({ type: 'form-data' });
  const form = await body.value;
  const data = await form.read();
  const file = data.files[0];
  const title = data.fields.title;
  const name = data.fields.name;
  const contentType = file.contentType;

  console.log(file);

  const id = await addAttachment(title, name, user.id);

  // Fetch signed url from storage service
  const res = await fetch('http://storage:6000/file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: id,
      contentType,
    }),
  });

  const { url } = await res.json();
  if (url.length === 0) {
    await deleteAttachment(id);
    response.status = 500;
    return;
  }

  const size = (await Deno.stat(file.filename)).size;
  const f = await Deno.open(file.filename, { read: true });
  const content = await Deno.readAll(f);
  console.log(content);
  console.log(file, url[0]);
  const blob = new Blob(content);
  const res1 = await fetch(url[0], {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Length': size,
    },
    file: blob,
  });

  response.status = res1.status;
};

export { uploadFile };
