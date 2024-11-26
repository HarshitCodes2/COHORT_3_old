export type OutgoingMessage = any;


export type Space = {
  id: string;
  name: string;
  width: number;
  height: number;
  thumbnail: string | null;
  creatorId: string;
} | null