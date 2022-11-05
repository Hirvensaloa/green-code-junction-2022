import { executeQuery } from '../database/index.js';

// Like: boolean
const likeAttachment = async (id, like) => {
  const likeAmount = like ? 1 : -1;

  const response = await executeQuery(
    'UPDATE attachment SET like_amount = like_amount + $likeAmount WHERE id = $id',
    {
      id,
      likeAmount,
    }
  );
  return response.rows[0];
};

const likePost = async (id, like) => {
  const likeAmount = like ? 1 : -1;

  const response = await executeQuery(
    'UPDATE post SET like_amount = like_amount + $likeAmount WHERE id = $id',
    {
      id,
      likeAmount,
    }
  );
  return response.rows[0];
};

const getPost = async (id) => {
  const response = await executeQuery(
    'SELECT * FROM text_post WHERE id = $id',
    { id }
  );

  return response.rows[0];
};

const listPosts = async () => {
  const response = await executeQuery('SELECT * FROM text_post', { id });

  return response.rows;
};

export { likeAttachment, likePost, getPost, listPosts };
