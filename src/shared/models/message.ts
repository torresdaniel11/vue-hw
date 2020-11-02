import { MESSAGE_TYPES } from "../enums/messageType";

export default interface Message {
  type: MESSAGE_TYPES;
  username: string;
  time: Date;
  text?: string;
  url?: string;
  alt?: string | null;
}
