/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize, { Op } from 'sequelize';
import config from '../config';

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

export default sequelize;
