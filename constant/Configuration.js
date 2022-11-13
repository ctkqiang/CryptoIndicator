import Binance from "binance-api-node";
import * as dotenv from "dotenv";

dotenv.config();

const environments = {
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  telegramToken: process.env.TELEGRAM_TOKEN,
  appName: process.env.DISCORD_WEBHOOK_APP_NAME,
  discrodWebhookURL: process.env.DISCORD_WEBHOOK_URL,
};

export default environments;
