## React Starter Kit — "[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)" web app boilerplate &nbsp; <a href="https://github.com/kriasoft/react-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/react-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a> <a href="https://twitter.com/ReactStarter"><img src="https://img.shields.io/twitter/follow/ReactStarter.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

- Based on [React Starter Kit](https://www.reactstarterkit.com)
  - Routes (pages) are in the "routes/" folder
  - Routes use the universal-router package: https://github.com/kriasoft/universal-router/blob/master/docs/getting-started.md
  - Each route references a "route component"
  - Each such route component has an index.js, being the higher order component, and then another component of its own name (e.g. Home.js) which is the presentational component
- Using MySql as a database and Sequelize package to connect to it
- Use highcharts-react: https://github.com/highcharts/highcharts-react
- Use highcharts
  - First example in Components/Chart1: https://www.highcharts.com/stock/demo/basic-line

4/1

- run basic highstock examples and display them in react
- Use graphql to let client ask server for data (then server gets data from highchart website and sends back to client)
  - graphql is similar to REST
  - Concept drawing: https://awwapp.com/b/uwvobciph/
  - GraphQl-js type definitions APi: https://graphql.org/graphql-js/type/

4/2

- remove graphql, replace with basic REST API
- add new folder data/api to handle all API requests (data requests), such as:
  "/api/highchartSampleData/aapl" -> gets us the data for AAPL from highchart sample data repository
  "/api/highchartSampleData/msft"

4/3

- we are debugging Chart2
- fixed the backend not returning our data
- talk through debugging strategies
- Consider code:
  - const data = x;
  - const { data } = x;
  - const data = x.data; // same as line above
- start working with DB
  - DBS has many DBs (we usually work with one)
  - The DB has multiple tables
  - Each tabe has many columns (variables)
  - Each table has many rows (each row one data point)
- In code: we use sequlize to talk to DB
  - One table is a model
  - Each model has many fields (corresponds to column)
- Added first new page: DataEntry

  - Add to routes/index.js
  - Copy existing (empty) page (one folder with 3 files)
  - Change content of existing page

- Learn structure of app:
  - components/Html.js defines the page sekleton `<html> <head /> <body /> </html>`
  - Html has child App
  - App takes care of routing (meaning: depending on the path selected will show different page, as defined in routes/index.js)
  - Each individual page (e.g. Home or DataEntry) has: `<Layout><Page /></Layout>`
  - Layout component has: Header
  - Header component has: Navigation
- Added form for DataEntry
  - Manual on how to use forms in React: https://reactjs.org/docs/forms.html

4/5

- Be able to run some JS (specifically: using sequelize) at our own leisure (run latest version of JS (e.g. ES2017)).
  1. Make sure you have babel7: `npm i --save-dev @babel/core @babel/node @babel/cli`
  1. See: https://babeljs.io/docs/en/babel-node
  1. Configure babel (usually you write a file called `.babelrc`)
     1. [reference config](https://github.com/Domiii/dbdi/blob/master/.babelrc)
     1. Install missing plugins: `$ npm i --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-proposal-function-bind @babel/plugin-syntax-export-default-from`
  1. `babel-node myFile`
- Sequelize
  - Getting started: http://docs.sequelizejs.com/manual/getting-started
  - Insert many rows at once: bulkCreate(values, {returning}) - https://stackoverflow.com/questions/35079286/sequelize-bulkcreate-returns-null-value-for-primary-key/35081421
  - Read rows - https://sequelize.readthedocs.io/en/latest/docs/querying/
  - Read rows and send via JSON - https://stackoverflow.com/questions/29869262/how-to-return-data-as-json-in-sequelize
  - Update: https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d
  - Delete: https://stackoverflow.com/questions/8402597/sequelize-js-delete-query

4/6

- sequelize run-down
  - sequelize.define - creates model, corresponds to table
    - when changing model, must (a) drop table (in development) or (b) change table manually or (c) do migrations (write a script to update the tables)
  - Model.build - create new object (corresponds to one row in table)
    - must call save() - inserts into table
  - Model.findAll - basic SELECT query

4/7

- Finished up stockPrice API
- Add stockPrice API call to client:
  1. In `componentDidMount`:
     1. Get data (e.g. by calling `await fetch(/api/....)`)
     1. Use `this.setState` to store result
  1. In `render`:
     1. Get result from `this.state` and display it

4/11
_ debugger in Node: use node with --inspect (or --inspect-brk) arguments
_ GET vs POST = GET is a read operation, POST is a write operation
(GET is not allowed to have a body) \*

4/12

- /\*\*
  \_ Steps for adding a new User interaction:
  _ 1. User presses button (or some other UI interaction)
  _ 2. Send request to server (via fetch)
  _ 3. Add API request handler in api/ folder (e.g. in api/stockPrice.js)
  _ 4. API handler talks to database
  _ 5. API handler sends back response
  _ 6. Client handles response of fetch
  \_ 7. Display result in DOM (by calling setState)
  \*/
