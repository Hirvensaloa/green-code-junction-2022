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

const getUserEnergy = async (userId) => {
  const response = await executeQuery(
    'SELECT amount FROM energy_bar WHERE user_id = $userId',
    {
      userId,
    }
  );

  return response.rows[0].amount;
};

const updateUserScore = async (userId, amount) => {
  await executeQuery(
    'UPDATE energy_bar SET amount = $amount WHERE user_id = $userId',
    {
      amount,
      userId,
    }
  );
};

export { addUser, getUser, getUserEnergy, updateUserScore };
