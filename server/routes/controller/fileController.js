import { addAttachment } from '../../service/uploadService.js';

const uploadFile = async ({ request, response, user }) => {
  const body = request.body({ type: 'form-data' });
  const reader = await body.value;
  const data = await reader.read();

  const { name, title, contentType } = data.fields;

  const type = contentType.split('/')[0];

  const id = await addAttachment(title, name, user.id, type);

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

  response.body = { url };
};

export { uploadFile };
