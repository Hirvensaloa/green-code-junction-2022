import { getUserEnergy } from '../../service/userService.js';

export const fetchUserEnergy = async ({ user, response }) => {
  const energy = await getUserEnergy(user.id);

  response.body = energy;
};
