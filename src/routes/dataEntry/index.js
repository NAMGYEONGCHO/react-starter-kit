import React from 'react';
import Layout from '../../components/Layout';
import DataEntry from './DataEntry';

const title = 'Stocks - Data Entry';

function action() {
  return {
    chunks: ['dataEntry'],
    title,
    component: (
      <Layout>
        <DataEntry title={title} />
      </Layout>
    ),
  };
}

export default action;
