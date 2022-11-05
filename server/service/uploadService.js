import { executeQuery } from '../database/index.js';

const addAttachment = async (title, name, userId, type) => {
  const res = await executeQuery(
    'INSERT INTO attachment (title, name, path, user_id, attachment_type) VALUES ($title, $name, $name, $userId, $type) RETURNING id',
    {
      title,
      name,
      userId,
      type,
    }
  );

  return res.rows[0].id;
};

const listAttachments = async () => {
  const res = await executeQuery(
    'SELECT * FROM attachment ORDER BY created_at DESC'
  );

  return res.rows;
};

const deleteAttachment = async (id) => {
  await executeQuery('DELETE FROM attachment WHERE id = $id', { id });
};

export { addAttachment, deleteAttachment, listAttachments };
