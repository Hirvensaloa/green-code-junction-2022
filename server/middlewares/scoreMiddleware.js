// create middleware that checks users score for any given action the user might take
// this middleware will be used in the routes to check if the user has enough score to perform the action
// if the user has enough score, the middleware will call next() to continue the request
// if the user does not have enough score, the middleware will return a 403 Forbidden response
//
import calculateScore from "../utils/calculateScore.js";

const handleScore = async ({ request, response, state }, next) => {
  // fetch the user's score from the database
  const score = await getScore(state.user.id);
  const scoreValue = score.amount ? score.amount : 0;
  // calculate the size of the file the user is trying to upload
  const body = request.body({ type: "form-data" });
  const reader = await body.value; // oak FormDataReader
  const data = await reader.read(); // oak FormDataBody
  const fileDetails = data.files[0];
  const actionScore = fileDetails.content
    ? calculateScore(fileDetails.content.length)
    : 0;
  if (scoreValue < actionScore) {
    response.status = 403;
    response.body = "Not enough score";
    return;
  } else {
    await next();
  }
};
