export const getImageBase64String = (buffer: Buffer) => {
  const profilePicture = Buffer.from(buffer);
  const base64String = profilePicture.toString('base64');
  return base64String;
};
