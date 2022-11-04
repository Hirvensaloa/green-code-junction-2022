// calculate score of a given upload action
// The score of an upload is based on the size of the file

export default calculateScore = (filesize) => {
  const factor = 0.000005;
  const score = filesize * factor;
  return score;
};
