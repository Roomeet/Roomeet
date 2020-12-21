export interface NotificationI {
  id: string;
  userId: string;
  topic: string;
  content: string;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
