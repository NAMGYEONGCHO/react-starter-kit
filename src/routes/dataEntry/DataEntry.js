import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'reactstrap';
import s from './DataEntry.css';

import Chart3 from '../../components/Chart3';
import CoinExchange from '../../components/CoinExchange';

async function sendDataToServer(company, data) {
  const rawResponse = await fetch(`/api/stockPrice/${company}`, {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.text();

  console.log('sendDataToServer - Server replied:', content);
}

async function clearAllData() {
  const rawResponse = await fetch('/api/stockPrice/clearAll', {
    method: 'POST',
  });
  const content = await rawResponse.text();

  console.log('clearAllData - Server replied:', content);
  return content;
}

class DataEntry extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = {
    companyName: '',
    data: '',
  };

  onChangeCompany = evt => {
    this.setState({
      companyName: evt.target.value,
    });
  };

  onChangeData = evt => {
    this.setState({
      data: evt.target.value,
    });
  };

  submit = async evt => {
    evt.preventDefault();

    // Convert array of arrays into array of { date: 12312313, price: 100000, company: 'appl' }
    const { companyName: company, data } = this.state;

    try {
      const dataArr = JSON.parse(data);

      // convert array of one format to array of another format (we always use map for this!)
      const rows = dataArr.map(([dateString, priceString]) => ({
        date: new Date(dateString),
        price: parseFloat(priceString),
        company,
      }));

      await sendDataToServer(company, rows);
    } catch (err) {
      console.error(err.stack);
      alert(
        `invalid format. Data must be valid JSON string, representing array of arrays could not convert: ${
          err.message
        }`,
      );
    }
  };

  clearAll = async evt => {
    /**
     * Steps:
     * 1. User presses button (or some other UI interaction)
     * 2. Send request to server (via fetch)
     * 3. Add API request handler in api/ folder (e.g. in api/stockPrice.js)
     * 4. API handler talks to database
     * 5. API handler sends back response
     * 6. Client handles response of fetch
     * 7. Display result in DOM (by calling setState)
     */
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure, you  want to clear all sandbox data?')) {
      const response = await clearAllData();
      alert(`Done! - ${response}`);
    }
  };

  render() {
    const { companyName, data } = this.state;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <Chart3 />
          <hr />
          <Button color="danger" onClick={this.clearAll}>
            Clear All
          </Button>
          <hr />
          <CoinExchange />
          <hr />
          <form>
            <input
              type="text"
              value={companyName}
              placeholder="company name"
              onChange={this.onChangeCompany}
            />
            <textarea
              value={data}
              className={s.rawData}
              onChange={this.onChangeData}
            />
            <Button onClick={this.submit}>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DataEntry);
