import axios from "axios";
import messageType from "../model/MessageType.js";
import nodemailer from "nodemailer";
import environments from "../constant/Configuration.js";
import XMLHttpRequest from "xhr2";

export default class Message {
  constructor(messageType) {
    this.messageType = messageType;
    this.telegramToken = environments.telegramToken;
    this.whatsApp = `https://api.green-api.com/waInstance${environments.greenIdInstance}/SendMessage/${environments.whatsAppToken}`;
  }

  async sendDiscord(message) {
    try {
      const parameters = {
        username: environments.appName,
        content: ` \`\`\`${message} \`\`\` `,
      };

      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(parameters),
        url: environments.discrodWebhookURL,
      }).then((result) => {
        console.info("Sent!");
      });
    } catch (e) {
      console.error("Unable to send at the moment.");
    }
  }

  async telegramGetChatID() {
    const url = `https://api.telegram.org/bot${this.telegramToken}/getUpdates`;
    const response = await axios.get(url);

    return response.data["result"][0]["my_chat_member"]["chat"]["id"];
  }

  async send(message) {
    switch (this.messageType) {
      case messageType.Telegram:
        const request = new XMLHttpRequest();
        const chatId = await this.telegramGetChatID();
        const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage?chat_id=${chatId}&text=${message}`;

        request.open("GET", url);
        request.send();
        break;
      case messageType.WhatsApp:
        /**
         * @see {@link https://green-api.com/en/docs/api/sending/SendMessage/}
         */
        const parameters = {
          chatId: "79001234567@c.us",
          message: message,
        };

        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(parameters),
          url: this.whatsApp,
        }).then((result) => {
          console.info("Sent!");
        });
        break;
      case messageType.Email:
        /**  Email configuration */
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: environments.gmailAddress,
            pass: environments.gmailPassword,
          },
        });

        const mailOptions = {
          from: environments.gmailAddress,
          to: environments.gmailAddress,
          subject: "The details you asked for",
          text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) console.error(error);

          console.log("Sent!");
        });
        break;
      case messageType.Discord:
        await this.sendDiscord(message);
        break;
      default:
        console.warn("No MessageType Selected.");
        break;
    }
  }
}
