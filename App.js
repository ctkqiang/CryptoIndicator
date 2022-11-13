import LBinance from "./services/LBinance.js";
import cron from "node-cron";
import inquirer from "inquirer";

class Application {
  constructor() {
    this.binance = new LBinance();
    this.choices = ["Yes", "No"];
    this.menu = [
      "I want to know the price of a cryptocurrency",
      "I want to know the price of all cryptocurrency",
      "I want to know the price of a cryptocurrency continuously for the next 15 mins",
      "I want to know the price of all cryptocurrency continuously for the next 15 mins",
      "I want to get notified for price changes",
      "I want to get the latest crypto news",
      "Exit",
    ];
  }

  async run() {
    await this.binance.instance();

    const listOfSymbols = await this.binance.getSymbolsList();

    const arguements = await inquirer.prompt([
      {
        type: "list",
        name: "crypto",
        message: "How can I help you today?",
        choices: this.menu,
      },
    ]);

    switch (arguements["crypto"]) {
      case this.menu[0]:
        const symbols = await inquirer.prompt([
          {
            type: "list",
            name: "label",
            message:
              "What is the crypto symbol you want to know the price from?",
            choices: listOfSymbols,
          },
        ]);

        await this.binance.getSpecificPrice(symbols["label"]);
        break;
      case this.menu[1]:
        await this.binance.getPrice();
        break;
      case this.menu[2]:
        const lsymbols = await inquirer.prompt([
          {
            type: "list",
            name: "label",
            message:
              "What is the crypto symbol you want to know the price from?",
            choices: listOfSymbols,
          },
        ]);

        const response = await this.binance.getSpecificPrice(lsymbols["label"]);

        cron.schedule("15 * * * * * *", async () => {
          console.log("\x1b[31m%s\x1b[0m", "*".repeat(50));

          await response;
        });
        break;
      case this.menu[3]:
        cron.schedule("15 * * * * * *", async () => {
          console.log("\x1b[31m%s\x1b[0m", "*".repeat(50));
          await this.binance.getPrice();
        });
        break;
      case "Exit":
      default:
        process.exit();
        break;
    }

    // TODO add cron push notification to services

    return;
  }
}

new Application().run();
