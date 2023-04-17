const names = [
    'Aaran',
    'other seed names here',
    ``,
  ];
  const users = [];
  const getNamePart = () => names[Math.floor(Math.random() * names.length)];
  const getRandomName = () => `${getNamePart()} ${getNamePart()}`;
  
  module.exports = getRandomName;