import Binance from "binance-api-node";
import * as dotenv from "dotenv";

dotenv.config();

const environments = {
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  telegramToken: process.env.TELEGRAM_TOKEN,
  appName: process.env.DISCORD_WEBHOOK_APP_NAME,
  discrodWebhookURL: process.env.DISCORD_WEBHOOK_URL,
  whatsAppToken: process.env.GREEN_API_TOKEN,
  greenIdInstance: process.env.GREEN_ID_INSTANCE,
  gmailAddress: process.env.GMAIL_ADDRESS,
  gmailPassword: process.env.GMAIL_PASSWORD,
  newsApi: process.env.NEWS_API,
};

export default environments;
