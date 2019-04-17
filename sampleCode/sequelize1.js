import Sequelize, { Op, Model } from 'sequelize';
import config from '../src/config';

const DataType = Sequelize;

console.log('Connecting to database...');

const sequelize = new Sequelize(
  Object.assign({}, config.database, {
    operatorsAliases: Op,
    define: {
      freezeTableName: true,
    },
    dialectOptions: {
      authSwitchHandler: ({ pluginName, pluginData }, cb) => {
        console.log('pluginName', pluginName, pluginData);
        // workaround for node mysql bug #1507
        // cb(null, Buffer.alloc(0));
        cb(null, pluginData);
      },
    },
  }),
);

// define our models
const StockPrice = sequelize.define(
  'StockPrice',
  {
    company: {
      type: DataType.STRING(10),
    },

    date: {
      type: DataType.DATE,
    },

    price: {
      type: DataType.DOUBLE,
    },
  },
  {
    indexes: [{ fields: ['company'] }],
  },
);

// run some code!
(async function() {
  // // create the connection to database
  // const connection = await mysql.createConnection({
  //     host: 'localhost',
  //     port: 3306,
  //     user: 'root',
  //     password: 'MySql1324qwasXY~!',
  //     database: 'mxc',
  //     authSwitchHandler: ({pluginName, pluginData}, cb) => {
  //         // workaround for node mysql bug #1507
  //         console.log('pluginName', pluginName);
  //         cb(null, Buffer.alloc(0));
  //     }
  // });
  // // query database
  // const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

  // await sequelize.authenticate();
  await sequelize.sync();
  console.log('Connected to database!');

  // create1: build -> save
  const price1 = StockPrice.build({
    company: 'msft',
    price: 15,
    date: new Date(),
  });

  await price1.save();

  // create2
  const price2 = await StockPrice.create({
    company: 'aapl',
    price: 10,
    date: new Date(),
  });

  // Read: show all prices - select (findAll)
  let prices = await StockPrice.findAll({});
  console.log(`Found ${prices.length} prices`);

  // update1
  await prices[0].update({ price: 20 });

  // update2 - https://sequelize.readthedocs.io/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows
  const values = { price: 180 };
  let selector = {
    where: { company: 'aapl' },
  };
  await StockPrice.update(values, selector);

  // delete1
  await prices[0].destroy();

  // delete2
  selector = {
    where: { company: 'aapl' },
  };
  await StockPrice.destroy(selector);

  // query once more
  prices = await StockPrice.findAll({ raw: true });
  console.log(`Found ${prices.length} prices`, prices);

  // we are done!
  sequelize.close();
})();
