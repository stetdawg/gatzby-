import rp from "request";
import $ from "cheerio";
import * as urls from "../services/urlbuilder";

const ScrapeGoogleShop = (upc) => {
  const sellers = {}; 
  rp(urls.GoogleUrl(upc), (function (err, resp, body1) {
        let parser = $("#search", body1);
        parser = parser.children().children().children().children();
        parser = parser.children().children().attr("href");
       let link = "https://www.google.com";
        for (let i = 0; i < parser.length; i++) {
          if (parser.charAt(i) === "?")
          break;
          link += parser.charAt(i);
       }
      link += "/online"; 
      console.log(link);
        rp(link, (function (err1, resp1, body) {
          const info = $.load(body);
      info('.os-row').each(function () {
       const curName = $(".os-seller-name", this);
        const curPrice = $(".os-total-col", this);
        console.log($(this).html());
    
        sellers.push({name: curName.text(), price: curPrice.text()});
      });
    
      sellers.sort(function (a, b) {
        if (b.price > a.price)
        return -1;
        if (b.price < a.price)
        return 1;
        return 0;
      });
    
       for (let i = 0; i < sellers.length; i++) {
       console.log(`seller:${sellers[i].name} for the price of${sellers[i].price}!`);
       }
     }));
     }));
};

export default ScrapeGoogleShop;
