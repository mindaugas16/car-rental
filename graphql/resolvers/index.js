const authResolver = require('./auth');
const carResolver = require('./car');
const locationResolver = require('./location');
const rentResolver = require('./rent');
const invoiceResolver = require('./invoice');
const userResolver = require('./user');

const rootResolver = {
  ...authResolver,
  ...carResolver,
  ...locationResolver,
  ...rentResolver,
  ...invoiceResolver,
  ...userResolver
};

module.exports = rootResolver;
