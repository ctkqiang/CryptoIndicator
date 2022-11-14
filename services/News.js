import NewsAPI from "newsapi";
import environments from "../constant/Configuration.js";

export default class News {
  constructor(author, title, description, url, content) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.content = content;
    this.newsapi = new NewsAPI(environments.newsApi);
  }

  async getNews(display = true) {
    var cryptoNews = [];
    const news = await this.newsapi.v2.everything({
      q: "crypto",
      language: "en",
      sortBy: "relevancy",
      page: 2,
    });

    for (var i = 0; i < news["articles"].length; i++) {
      cryptoNews.push(
        new News(
          news["articles"][i]["author"],
          news["articles"][i]["title"],
          news["articles"][i]["description"],
          news["articles"][i]["url"],
          news["articles"][i]["content"]
        )
      );

      if (display) {
        console.log("\x1b[33m%s\x1b[0m", cryptoNews[0]);
      }
    }

    return cryptoNews;
  }
}
