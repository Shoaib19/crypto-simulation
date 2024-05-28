# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Istall pakages

In the project directory, install node version v22.2.0 then run:
 
 npm install

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### To run DB
it is not full DB is is limited db created by json server
use following command:

npx json-server --watch db/orderbook.json --port 8000

on local you will see endoint for db something like this:

http://localhost:8000/order_historyTable
