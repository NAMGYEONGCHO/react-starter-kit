import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

const ApiKey =
  'd4400ee665681a0ec15896f40e69afc5edf28fd26598b51cf8a622d2907ff912';

async function getTopPerformingCoins(limit = 10, currency = 'USD') {
  const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=${currency}&api_key=${ApiKey}`;

  const response = await fetch(url, {});

  const result = await response.json();
  debugger;
  if (result.Message !== 'Success') {
    console.error(result);
    alert(`Could not get data - ${result.Message}`);
    return {};
  }
  return result.Data;
}

function getRenderDataRow(raw, currency = 'USD') {
  // get structure of data from API explorer: https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalVolumeEndpointFull
  const {
    CoinInfo: {
      Id: id,
      Name: name,
      FullName: fullName,
      ImageUrl: imageUrl,
      Url: infoUrl,
    },
    DISPLAY: {
      [currency]: { FROMSYMBOL: symbol, PRICE: price, LASTUPDATE: lastUpdate },
    },
  } = raw;

  return {
    id,
    symbol,
    name,
    fullName,
    price,
    lastUpdate,

    imageUrl: `https://www.cryptocompare.com/${imageUrl}`,
    infoUrl,
  };
}

class CoinTableRow extends Component {
  render() {
    const { index, data } = this.props;
    const {
      id,
      symbol,
      name,
      fullName,
      price,
      lastUpdate,

      imageUrl,
      infoUrl,
    } = getRenderDataRow(data);
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <img className="size-1" src={imageUrl} /> {symbol} {name} {fullName}
        </td>
        <td>{price}</td>
        <td>{lastUpdate}</td>
      </tr>
    );
  }
}

class CoinTable extends Component {
  render() {
    const { data } = this.props;
    let rows;
    if (data) {
      rows = data.map((d, i) => <CoinTableRow index={i} data={d} />);
    } else {
      rows = '';
    }
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default class CoinExchange extends Component {
  state = {};

  getData = async evt => {
    evt.preventDefault();
    const result = await getTopPerformingCoins();
    this.setState({ result });
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <Button onClick={this.getData} color="success">
          Get data!
        </Button>
        <CoinTable data={result} />
        <pre>{JSON.stringify(result || {}, null, 2)}</pre>
      </div>
    );
  }
}
