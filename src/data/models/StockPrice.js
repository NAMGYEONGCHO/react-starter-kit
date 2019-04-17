/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const StockPrice = Model.define(
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

export default StockPrice;
