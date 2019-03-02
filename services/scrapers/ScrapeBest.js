import rp from "request";
import $ from "cheerio";
import * as urls from "../services/urlbuilder";

const ScrapeBest = (upc) => {
  let responce = {};
  rp(urls.BestUrl(upc), (function (err, resp, body) {
      $.load(body);  
  }));
  return responce;
};

export default ScrapeBest;
