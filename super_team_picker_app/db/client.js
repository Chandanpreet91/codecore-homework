const knexfile = require("../knexfile");

const knexConnector = require("knex");

const knex = knexConnector(knexfile.development);

module.exports = knex;
// const config = require('../knexfile.js')['development'];
// const knex = require('knex')(config);
// module.exports = knex;