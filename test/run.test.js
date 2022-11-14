import fs from "fs";
import chai from "chai";
import mocha from "mocha";
import News from "../services/News.js";
import LBinance from "../services/LBinance.js";
import Connectivity from "../services/Connectivity.js";

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const news = new News();
const connectivity = new Connectivity();
const lbinance = new LBinance(false);

describe("[1] Configuration", () => {
  const filePath = ".env";

  it("The .env file must not be missing", async () => {
    expect(fs.existsSync(filePath), ".env");
  });

  it("Variables in .env must not undeclared or missing.", async () => {
    fs.readFile(filePath, (error, data) => {
      if (error) throw error;

      expect(data.length).to.be.gte(10);

      expect(data.includes("BINANCE_API_KEY"), true);
      expect(data.includes("BINANCE_API_SECRET"), true);
      expect(data.includes("DISCORD_WEBHOOK_APP_NAME"), true);
      expect(data.includes("DISCORD_WEBHOOK_URL"), true);
      expect(data.includes("GREEN_API_TOKEN"), true);
      expect(data.includes("GREEN_ID_INSTANCE"), true);
      expect(data.includes("GMAIL_ADDRESS"), true);
      expect(data.includes("GMAIL_PASSWORD"), true);
      expect(data.includes("NEWS_API"), true);
    });
  });
});

describe("[2] Connectivity", () => {
  it("Binance Server Must return status [200]", async () => {
    const result = await connectivity.getStatus(false);

    expect(result, 200).should.not.be.equal(400);
    expect(result, 200).should.not.be.equal(404);
    expect(result, 200).should.not.be.equal(500);
  });
});

describe("[3] Binance", () => {
  it("The list of available cryptocurrencies are not empty or missing", async () => {
    const result = await lbinance.getSymbolsList();

    assert(result != null);
  });

  it("The Binance Server Must return a specific symbol's price", async () => {
    const price = await lbinance.getSpecificPrice("XLMUSDT", false);

    assert(price != null);
  });

  it("The Binance Server Must return price for all available crypto currencies", async () => {
    const price = await lbinance.getPrice(true);

    assert(price != null);
  });
});

describe("[5] News", () => {
  it("The news are not empty or missing", async () => {
    const cryptoNews = await news.getNews(false);

    assert(cryptoNews != null);
  });
});
