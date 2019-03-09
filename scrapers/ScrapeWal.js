import rp from "request";
import $ from "cheerio";
import * as urls from "../services/urlbuilder";

const ScrapeWal = (upc) => {
  const responce = {};
  rp(urls.walmartUrl(upc), (function (err, resp, body) {
    $.load(body); 
  }));
  return responce;
};

export default ScrapeWal;
