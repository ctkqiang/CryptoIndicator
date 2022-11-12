import LBinance from "./services/LBinance.js";
import cron from "node-cron";

class Application {
  constructor() {
    this.binance = new LBinance();
  }

  async run() {
    await this.binance.instance();
    await this.binance.getPrice();

    cron.schedule("* * * * *", async () => {
      console.log("******************************");
      await this.binance.getPrice();
    });

    // TODO add cron push notification to services
  }
}

new Application().run();
