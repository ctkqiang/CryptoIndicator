import messageType from "../model/MessageType.js";
import environments from "../constant/Configuration.js";
import XMLHttpRequest from "xhr2";

export default class Message {
  constructor(messageType) {
    this.messageType = messageType;
    this.telegramToken = environments.telegramToken;
  }

  async telegramGetChatID() {
    const url = `https://api.telegram.org/bot${this.telegramToken}/getUpdates`;
  }

  async send(message) {
    switch (this.messageType) {
      case messageType.Telegram:
        const request = new XMLHttpRequest();
        const chatId = "-1001443157787"; //todo change
        const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage?chat_id=${chatId}&text=${message}`;

        request.open("GET", url);
        request.send();
        break;
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
