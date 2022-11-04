import { executeQuery } from "../database.js";

const addUser = async (user) => {
  await executeQuery("INSERT INTO users (username, password) VALUES ($1, $2)", {
    $1: user.name,
    $2: user.password,
  });
};

const getUser = async (username) => {
  const response = await executeQuery(
    "SELECT * FROM users WHERE username = $1",
    {
      $1: username,
    }
  );

  return response.rows[0];
};

const getUserScore = async (userId) => {
  const response = await executeQuery(
    "SELECT amount FROM users WHERE user_id = $1",
    {
      $1: userId,
    }
  );

  return response.rows[0];
};

export { addUser, getUser };
