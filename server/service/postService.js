import { executeQuery } from "../database/index.js";

const likePost = async (id, like) => {
  const likeAmount = like ? 1 : -1;

  await executeQuery(
    "UPDATE text_post SET score = score + $likeAmount WHERE id = $id",
    {
      id,
      likeAmount,
    }
  );

  await executeQuery(
    "UPDATE attachment SET score = score + $likeAmount WHERE id = $id",
    {
      id,
      likeAmount,
    }
  );
};

const getPost = async (id) => {
  const response = await executeQuery(
    "SELECT * FROM text_post WHERE id = $id",
    { id }
  );

  return response.rows[0];
};

const addPost = async (title, content, userId) => {
  const response = await executeQuery(
    "INSERT INTO text_post (title, content, user_id) VALUES ($title, $content, $userId) RETURNING id",
    {
      title,
      content,
      userId,
    }
  );

  return response.rows[0].id;
};

const listPosts = async () => {
  const response = await executeQuery(
    "SELECT * FROM text_post ORDER BY created_at DESC"
  );

  return response.rows;
};

export { likePost, getPost, listPosts, addPost };
