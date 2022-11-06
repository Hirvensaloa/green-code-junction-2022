export const calculateEnergy = (filesize: number) => {
  const factor = 0.001;
  const amount = filesize * factor;
  return Math.round(amount);
};

export const decrementEnergy = async (amount: number) => {
  const rounded = Math.round(amount);

  const headers = new Headers();
  headers.append('actionenergy', rounded.toString());
  const response = await fetch(
    'http://localhost:7777/api/user/decrease/energy',
    { headers, method: 'POST' }
  );
};

export const fetchEnergy = async () => {
  const response = await fetch('http://localhost:7777/api/user/energy');

  const energy = await response.json();

  return energy || 0;
};
