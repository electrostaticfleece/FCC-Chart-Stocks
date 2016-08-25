import Models from '../models';
const stock = Models.stock;
const sequelize = Models.sequelize;

export function add(data) {
  stock.findOrCreate({where: {id: data.id}, defaults: {ticker: data.ticker, name: data.name}}, )
  .then((stock) => {
    console.log('Stock, ' + stock[0].dataValues.ticker + ' was added or located in the database.');
  })
  .catch((err) => {
    console.log('We encountered an error adding the stock ' + data.ticker +' to the database', err);
  });
}

export function destroy(data) {
  return stock.destroy({where: {id: data.id}})
  .then(() => {
    console.log('Stock ' + data.ticker + ' was successfully removed from the DB');
    return null;
  })
}

export function getAll() {
  return stock.findAll()
  .then((data) => {
    return data.map((stock) => {
      return stock.dataValues;
    });
  });
}

export default {
  add,
  destroy,
  getAll
}