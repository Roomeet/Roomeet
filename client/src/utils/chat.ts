export const getChatroomName = (participantsName: string, userName: string): string => {
  const splittedNames = participantsName.split(',');
  return splittedNames[0]?.toLowerCase() === userName?.toLowerCase()
    ? splittedNames[1] : splittedNames[0];
};
