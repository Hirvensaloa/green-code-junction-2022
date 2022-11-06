// create middleware that checks users score for any given action the user might take
// this middleware will be used in the routes to check if the user has enough score to perform the action
// if the user has enough score, the middleware will call next() to continue the request
// if the user does not have enough score, the middleware will return a 403 Forbidden response
//
import { getScore, updateScore } from "../utils/calculateScore.js";

const scoreMiddleware = async ({ request, response, state }, next) => {
  // if user is trying to log in or register, continue the request
  if (
    request.url.pathname === "/login" ||
    request.url.pathname === "/register"
  ) {
    await next();
    return;
  }
  // fetch the user's score from the database
  const score = await getScore(state.user.id);
  const scoreValue = score.amount ? score.amount : 0;
  // calculate the size of the file the user is trying to upload
  const actionScore = request.headers.score
    ? Number(request.headers.score)
    : 1000;
  if (scoreValue < actionScore) {
    response.status = 403;
    response.body = "Not enough score";
    return;
  } else {
    const newScore = scoreValue - actionScore;
    updateScore(state.user.id, newScore);
    response.headers.set("energy", newScore);
    await next();
  }
};

export { scoreMiddleware };
