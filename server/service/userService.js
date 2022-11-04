import { executeQuery } from '../database';

const registerUser = async (user) => {
  await executeQuery('INSERT INTO users (name, password) VALUES ($1, $2)', {
    $1: user.name,
    $2: user.password,
  });
};

const loginUser = async (user) => {
  const response = await executeQuery(
    'SELECT * FROM users WHERE name = $1 AND password = $2',
    {
      $1: user.name,
      $2: user.password,
    }
  );

  return response.rows;
};

export { registerUser, loginUser };
