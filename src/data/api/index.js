import express from 'express';
import highchartSampleData from './highchartSampleData';
import stockPrice from './stockPrice';

const router = express.Router();
// setup our REST API routes

router.use('/highchartSampleData', highchartSampleData);
router.use('/stockPrice', stockPrice);

router.use((req, res) => {
  res.status(404).send('no such API route');
});

export default router;

// index.htm
// src/components/...
// src/index.js
