export const getChatroomName = (participantsName: string, userName: string): string => {
  const splittedNames = participantsName.split(',');
  return splittedNames[0] === userName ? splittedNames[1] : splittedNames[0];
};

console.log(getChatroomName('Liam Kless,Sulimani', 'Liam Kless'));
