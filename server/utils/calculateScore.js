// calculate score of a given upload action
// The score of an upload is based on the size of the file

const calculateScore = (filesize) => {
  const factor = 0.000005;
  const score = filesize * factor;
  return score;
};

const getScore = async (userId) => {
  const user = await getUserScore(userId);
  return user.score;
};

export { calculateScore, getScore };
