import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

function makeUrl(company) {
  return `https://www.highcharts.com/samples/data/${company.toLowerCase()}-c.json`;
}

let lastFetchTask;
let oldData;

// Variables in Express routes: https://stackoverflow.com/questions/8506658/node-js-express-routing-with-get-params
// example: http://localhost:3000/api/highchartSampleData/aapl
router.get('/:company', (req, res, next) => {
  const { company } = req.params;
  const url = makeUrl(company);

  console.log('opening url:', url);
  // if (lastFetchTask) {
  //     return lastFetchTask;
  // }

  // lastFetchTask =
  return fetch(url)
    .then(response => response.json()) // this gets us the data from the response (or response.text() [string] or response.body() [stream])
    .then(data => {
      lastFetchTask = null;
      oldData = data;
      res.send(data);
      return data;
    })
    .catch(err => {
      lastFetchTask = null;
      console.error((err && err.stack) || err);
      next(err);
    });

  // return lastFetchTask;
});

export default router;
