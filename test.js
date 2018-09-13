const debug = require('debug')('app-test');

const PORT = process.env.PORT || 3000;

debug(`you just use an enviromental variable ${PORT}`);

const obj = {
  name: 'Vassilis',
  age: 37
};

debug(`name = ${obj.name} ||
       age = ${obj.age}`);

const book = {
  title: 'come back again'
};

debug(`printing out a book = ${book}`);
