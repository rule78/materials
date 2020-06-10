var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH_URL: '"http://account-auth.tst.jianke.com"',
  API_URL: '"http://legacy-product-client.tst.jianke.com"',
  CART_SEARCH:'"http://magnifier-mall-search-api-intranet.dev.jianke.com"',
  STOCK_SETTING: '"http://inventory-dispatcher-service.dev.jianke.com"',
  JWT_GATEWAY: '"http://mgmt-gateway.dev.jianke.com"',
})
