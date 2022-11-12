import LBinance from "./services/LBinance.js";

class Application {
  constructor() {
    this.binance = new LBinance();
  }

  async run() {
    await this.binance.instance();
    await this.binance.getPrice();
  }
}

new Application().run();
