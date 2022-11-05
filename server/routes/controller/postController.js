import { addPost, getPost, listPosts } from '../../service/postService.js';

const fetchPost = async ({ response, params }) => {
  const post = getPost(params.id);

  response.body = post;
};

const fetchPostList = async ({ response }) => {
  const postList = await listPosts();

  response.body = postList;
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
