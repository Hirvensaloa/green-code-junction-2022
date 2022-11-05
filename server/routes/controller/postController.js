import { getPost, listPosts } from '../../service/postService.js';

const fetchPost = async ({ response, params }) => {
  const post = getPost(params.id);

  response.body = post;
};

const fetchPostList = async ({ response }) => {
  const postList = await listPosts();

  response.body = postList;
};

export { fetchPost, fetchPostList };
