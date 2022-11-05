import { addPost, getPost, listPosts } from '../../service/postService.js';
import { listAttachments } from '../../service/uploadService.js';

const fetchPost = async ({ response, params }) => {
  const post = getPost(params.id);

  response.body = post;
};

const fetchPostList = async ({ response }) => {
  const postList = await listPosts();
  const files = await listAttachments();

  // Merge files and posts by created_at
  const posts = [...postList, ...files].sort(
    (a, b) => b.created_at - a.created_at
  );

  const contents = [];

  for (const post of posts) {
    if (post?.attachment_type) {
      const res = await fetch(`http://storage:6000/file/${post?.id}`);
      const { url } = await res.json();

      contents.push({
        ...post,
        content: url[0],
        type: post.attachment_type,
      });
    } else {
      contents.push({ ...post, type: 'text' });
    }
  }

  response.body = contents;
};

const uploadPost = async ({ request, response, user }) => {
  const body = request.body({ type: 'form' });
  const params = await body.value;

  const title = params.get('title');
  const content = params.get('content');

  if (title && content) {
    await addPost(title, content, user.id);

    response.redirect('/');
  } else {
    response.status = 400;
  }
};

export { fetchPost, fetchPostList, uploadPost };
