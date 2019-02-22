import rp from "request";
import $ from "cheerio";
import * as urls from "../services/urlbuilder";

const ScrapeWal = (upc) => {
    var responce = {};
    rp(urls.targetUrl(upc), (function (err, resp, body) {
          
    }));
    return responce;
};

export default ScrapeWal;
