// create middleware that checks users energy for any given action the user might take
// this middleware will be used in the routes to check if the user has enough energy to perform the action
// if the user has enough energy, the middleware will call next() to continue the request
// if the user does not have enough energy, the middleware will return a 403 Forbidden response
//
import { updateEnergy, getEnergy } from '../utils/calculateScore.js';

const energyMiddleware = async ({ request, response, user }, next) => {
  // if user is trying to log in or register, continue the request
  if (
    request.url.pathname === '/login' ||
    request.url.pathname === '/register'
  ) {
    await next();
    return;
  }
  // fetch the user's energy from the database
  const energyValue = await getEnergy(user.id);
  const actionEnergy = Number(request.headers.get('actionenergy'))
    ? Number(request.headers.get('actionenergy'))
    : 1000;
  if (energyValue < actionEnergy) {
    response.status = 403;
    response.body = 'Not enough energy';
    return;
  } else {
    const newEnergy = energyValue - actionEnergy;
    await updateEnergy(user.id, newEnergy);
    response.headers.set('energy', newEnergy);
    await next();
  }
};

export { energyMiddleware };
