import rp from "request";
import $ from "cheerio";
import * as urls from "../services/urlbuilder";

const ScrapeAma = (upc) => {
  var responce = {};
  rp(urls.amazonUrl(upc), (function (err, resp, body) {
        
  }));
  return responce;
};

export default ScrapeAma;
