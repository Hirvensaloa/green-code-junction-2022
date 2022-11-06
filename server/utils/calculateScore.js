// calculate amount of a given upload action
// The amount of an upload is based on the size of the file

import { getUserEnergy, updateUserScore } from '../service/userService.js';

const getEnergy = async (userId) => {
  return await getUserEnergy(userId);
};

const updateEnergy = async (userId, amount) => {
  await updateUserScore(userId, amount);
};

export { getEnergy, updateEnergy };
