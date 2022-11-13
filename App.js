/**
 *     MIT License
 *
 * Copyright (c) 2022 John Melody Me
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * @author John Melody Me <johnmelodyme@icloud.com>
 * @version 1.0.0
 * @see {@link https://github.com/johnmelodyme/CryptoIndicator.git}
 * @since 1.0.0
 */
import LBinance from "./services/LBinance.js";
import cron from "node-cron";
import inquirer from "inquirer";
import Message from "./services/Message.js";
import messageType from "./model/MessageType.js";

class Application {
  /**
   * @constructor {Application}
   */
  constructor() {
    this.binance = new LBinance();
    this.choices = ["Yes", "No"];
    this.channel = [
      messageType.Telegram,
      messageType.Viber,
      messageType.Discord,
      messageType.WhatsApp,
      messageType.Email,
    ];
    this.menu = [
      "I want to know the price of a cryptocurrency",
      "I want to know the price of all cryptocurrency",
      "I want to know the price of a cryptocurrency continuously for the next 15 mins",
      "I want to know the price of all cryptocurrency continuously for the next 15 mins",
      "I want to get the latest crypto news",
      "I want to get the price of a cryptocurrency sent to me",
      "I want to get the price of all cryptocurrency sent to me",
      "Exit",
    ];
    this.msg = [
      "What is the crypto symbol you want to know the price from?",
      "Where do you want me to send the details to?",
      "How can I help you today?",
    ];
  }

  /** Method for executing compilation of every components. */
  async run() {
    /**
     *  @variable listOfSymbols gets the lists of every available
     * symbol of the cryptocurrency.
     */
    const listOfSymbols = await this.binance.getSymbolsList();

    /**
     * Initiate binance instances.
     */
    await this.binance.instance();

    /**
     * @variable arguements gets the user selected `menu` which
     * enable further decision making of returning or executing
     * specific logic based method.
     */
    const arguements = await inquirer.prompt([
      {
        type: "list",
        name: "crypto",
        message: this.msg[2],
        choices: this.menu,
      },
    ]);

    switch (arguements["crypto"]) {
      case this.menu[0]:
        const symbols = await inquirer.prompt([
          {
            type: "list",
            name: "label",
            message: this.msg[0],
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
            message: this.msg[0],
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
      case this.menu[4]:
        break;

      case this.menu[5]:
        const ksymbols = await inquirer.prompt([
          {
            type: "list",
            name: "label",
            message: this.msg[0],
            choices: listOfSymbols,
          },
        ]);

        const kresponse = await this.binance.getSpecificPrice(
          ksymbols["label"]
        );

        const messagetype = await inquirer.prompt([
          {
            type: "list",
            name: "channel",
            message: this.msg[1],
            choices: this.channel,
          },
        ]);

        const request = new Message(messagetype["channel"]);

        request.send(`The Price of [${ksymbols["label"]}]: ${kresponse}`);
        break;
      case this.menu[6]:
        const prices = await this.binance.getPrice(true);
        const kmessagetype = await inquirer.prompt([
          {
            type: "list",
            name: "channel",
            message: this.msg[1],
            choices: this.channel,
          },
        ]);

        const krequest = new Message(kmessagetype["channel"]);

        krequest.send(prices);
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
