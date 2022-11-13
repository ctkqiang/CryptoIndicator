import Binance from "node-binance-api";
import environments from "../constant/Configuration.js";
import Connectivity from "./Connectivity.js";

export default class LBinance {
  constructor() {
    this.connectivity = new Connectivity();
    this.client = new Binance().options({
      APIKEY: environments.apiKey,
      APISECRET: environments.apiSecret,
    });
    this.connectivity.setBanner();
  }

  /**
   *
   */
  async instance() {
    await this.connectivity.getStatus();
    return await this.client;
  }

  /**
   * Get the current price of all available cryptocurrencies into a table
   * which will display to the console.
   *
   * @param {boolean} message: Default setted to `false`, expect to log
   * the `value` to console. When the variable is set to `true`, the `value`
   * will not be logged, instead it @returns {object} of the `value`.
   */
  async getPrice(isMessage = false) {
    const value = await this.client.futuresPrices();
    const now = new Date().toISOString();

    if (isMessage == false) {
      console.info(
        "\x1b[33m%s\x1b[0m'",
        `\n\nBinance Crypto Future Price @[${now}]`
      );

      console.table(value);
    }

    return JSON.stringify(value);
  }

  /**
   * @param {string} symbol: A string value required when the method called for
   * returning @returns {number} from the property assigned to the requested key.
   */
  async getSpecificPrice(symbol) {
    const value = await this.client.futuresPrices();

    console.log(
      "\x1b[33m%s\x1b[0m",
      `* The Price of [${symbol}]: ${value[symbol]}  `
    );

    return value[symbol];
  }

  /**
   *
   */
  async getSymbolsList() {
    const value = await this.client.futuresPrices();

    return Object.keys(value);
  }
}
