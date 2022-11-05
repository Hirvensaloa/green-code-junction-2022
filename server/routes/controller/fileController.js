import { addAttachment, listAttachments } from '../../service/uploadService.js';

const uploadFile = async ({ request, response, user }) => {
  const body = request.body({ type: 'form' });
  const params = await body.value;
  const name = params.get('name');
  const contentType = params.get('contentType');
  const title = params.get('title');

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

  response.body = { url };
};

const getFiles = async ({ response }) => {
  const files = await listAttachments();

  console.log(files);

  const promises = files.map((file) =>
    fetch(`http://storage:6000/file/${file.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );

  const urls = await Promise.all(promises);
  response.body = urls;
};
export { uploadFile, getFiles };
