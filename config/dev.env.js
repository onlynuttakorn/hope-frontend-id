"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: "'//192.168.1.44:8085'",
  LOCAL_API: "'//localhost:3000'"
});
