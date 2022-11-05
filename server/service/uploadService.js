import { executeQuery } from '../database/index.js';

const addAttachment = async (title, name, userId) => {
  const res = await executeQuery(
    'INSERT INTO attachment (title, name, path, user_id) VALUES ($title, $name, $name, $userId) RETURNING id',
    {
      title,
      name,
      userId,
    }
  );

  return res.rows[0].id;
};

const deleteAttachment = async (id) => {
  await executeQuery('DELETE FROM attachment WHERE id = $id', { id });
};

export { addAttachment, deleteAttachment };
