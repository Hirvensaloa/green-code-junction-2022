import { executeQuery } from '../database/index.js';

const addUser = async (username, password) => {
  await executeQuery(
    'INSERT INTO users (username, password) VALUES ($username, $password)',
    {
      username: username,
      password: password,
    }
  );
};

const getUser = async (username) => {
  const response = await executeQuery(
    'SELECT * FROM users WHERE username = $username',
    {
      username,
    }
  );

  return response.rows[0];
};

const getUserScore = async (userId) => {
  const response = await executeQuery(
    'SELECT amount FROM users WHERE user_id = $1',
    {
      $1: userId,
    }
  );

  return response.rows[0];
};

export { addUser, getUser };
