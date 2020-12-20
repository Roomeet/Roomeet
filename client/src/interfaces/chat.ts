export interface chatRoomI {
  id: string;
  name: string;
  participants: string[]
}

export interface messageI {
  message: string;
  userId: string;
}
