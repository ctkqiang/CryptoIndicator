import messageType from "../model/MessageType.js";

export default class Message {
  constructor(messageType) {
    this.messageType = messageType;
  }

  async send() {
    switch (this.messageType) {
      case messageType.Telegram:
      case messageType.Viber:
      case messageType.WhatsApp:
      case messageType.Email:
      case messageType.Discord:
      default:
        console.warn("No MessageType Selected.");
        break;
    }
  }
}
