import axios from 'axios';
import * as types from '../../app/types';

const apiKey = process.env.QUANDL_API_KEY;
const baseURL = "https://www.quandl.com/api/v3/datasets/WIKI/";
const stockCall = axios.create({
  baseURL,
  timeout: 5000
});

/* *
 *  EXAMPLE REQUEST
 *  https://www.quandl.com/api/v3/datasets/WIKI/FB.json?&start_date=2014-01-01
 *  &end_date=2014-12-31&api_key=BuFyBCG9ymxRcS2ej_ao
 * 
 *  - Datasets/WIKI : Specifies we are requesting the WIKI dataset
 *  - FB : Specifies we are looking for a stock with the ticker FB (facebook)
 *  - start_date: Specifies the start date is Jan. 1st 2014
 *  - end_date: Specifies the end date is Dec. 31st 2014
 *  - api_key: Specifies our api key
 * */

//Get stock data for the past year
export function getStock(ticker) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formatData = function(data) {
    data = JSON.parse(data);
    const { dataset } = data;
    
    return {
      id: dataset.id,
      ticker: dataset.dataset_code,
      name: dataset.name,
      data: dataset.data
    };
  }
  
  return stockCall.get(`${ticker.toUpperCase()}.json`, {
    params: {
      end_date: `${year}-${month}-${day}`,
      start_date: `${year - 1}-${month}-${day}`,
      api_key: apiKey
    },
    transformResponse: [formatData]
  });
}

//After the resolution of the returned promise 
//a stock object is created to hydrate the state
//of the application and/or be placed in the database. 
export function getAllStocks(stockMetaData){
  const stocks = {};

  const stockPromises = stockMetaData.map((stock) => {
    return getStock(stock.ticker)
  });

  return Promise.all(stockPromises)
  .then((stockData) => {
    stockData.forEach((res) => {
      const { data } = res
      stocks[data.ticker] = data;
    });

    return stocks

  });
}