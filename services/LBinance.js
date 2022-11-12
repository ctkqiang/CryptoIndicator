import Binance from "node-binance-api";
import environments from "../constant/Configuration.js";

export default class LBinance {
  constructor() {
    this.client = new Binance().options({
      APIKEY: environments.apiKey,
      APISECRET: environments.apiSecret,
    });
  }

  async instance() {
    return await this.client;
  }

  async getPrice() {
    const value = await this.client.futuresPrices();
    const now = new Date().toISOString();

    console.info(
      "\x1b[33m%s\x1b[0m'",
      `\n\nBinance Crypto Future Price @[${now}]`
    );

    console.table(value);
  }

  async getSpecificPrice(symbol) {
    const value = await this.client.futuresPrices();

    console.log(
      "\x1b[33m%s\x1b[0m",
      `* The Price of [${symbol}]: ${value[symbol]}  `
    );
  }

  async getSymbolsList() {
    const value = await this.client.futuresPrices();

    return Object.keys(value);
  }
}
