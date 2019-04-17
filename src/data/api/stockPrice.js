import express from 'express';
import sequelize from '../sequelize';
import StockPrice from '../models/StockPrice';

const router = express.Router();

router.post('/clearAll', async (req, res, next) => {
  try {
    // log to console
    console.log('clearing StockPrice');

    // delete all rows from StockPrice Model (table)
    const nRows = await StockPrice.destroy({ where: {} });

    // send response to client
    res.send(`ok ${nRows}`);
  } catch (err) {
    next(err);
  }
});

// Get data from database, then send to client.
// Example: http://localhost:3000/api/stockPrice/aapl
router.get('/:company', async (req, res, next) => {
  try {
    const { company } = req.params;

    console.log('fetching data from database:');

    let prices = await StockPrice.findAll({
      where: {
        company,
      },
    });
    console.log(`Found ${prices.length} prices`);

    prices = prices.map(price => [price.date.getTime(), price.price]);
    res.send(prices);
  } catch (err) {
    next(err);
  }
});

router.post('/:company', async (req, res, next) => {
  try {
    const { company } = req.params;

    // 1. get data from client
    const prices = req.body;
    console.log('adding data to StockPrice:', prices);
    debugger;

    // 2. add data to database

    const newPrices = await StockPrice.bulkCreate(prices);

    // 3. send response to client
    res.send('ok');
  } catch (err) {
    next(err);
  }
});

export default router;
