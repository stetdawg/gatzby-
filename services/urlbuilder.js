import * as apiKeys from "../assets/constants/api_keys";

export const warlmartAPIUrl = (upc) => {
 return `http://api.walmartlabs.com/v1/items?apiKey=${apiKeys.WalmartAPI}&upc=${upc}&format=json`;
};
export const walmartUrl = (upc) => {
  return `https://www.walmart.com/search/?query=${upc}&cat_id=0`;
};

export const amazonUrl = (upc) => {
 return `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${upc}`;
};

export const targetUrl = (upc) => {
    return `https://www.target.com/s?searchTerm=${upc}`;
};
export const BestUrl = (upc) => {
    return `https://www.bestbuy.com/site/searchpage.jsp?st=${upc}&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys`;
};
