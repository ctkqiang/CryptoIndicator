import http from "http";
import https from "https";
import figlet from "figlet";
export default class Connectivity {
  getStatus() {
    return new Promise((resolve, reject) => {
      https.get("https://www.google.com", function (res) {
        resolve(res.statusCode === 200);

        if (res.statusCode == 200) {
          console.info(
            "\x1b[33m%s\x1b[0m",
            "\n\n[200] The Binance services are working \n"
          );
        } else {
          console.warn(
            "\x1b[31m%s\x1b[0m",
            `\n\n[${res.statusCode}] The Binance services are not working  \n`
          );
        }
      });
    });
  }

  setBanner() {
    const message = "CRYPTO PRICE INDICATOR";
    const author = "\tBY JOHN MELODY ME ";

    figlet(message, function (err, data) {
      if (err) return;

      console.log("\x1b[33m%s\x1b[0m", data + author);
    });
  }
}
