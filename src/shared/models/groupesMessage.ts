import Message from './message';

export default interface GroupedMessage {
  username: string;
  time: Date;
  messages: Message[];
}
