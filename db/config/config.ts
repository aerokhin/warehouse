module.exports = {
  development: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse_dev',
    host: '127.0.0.1'
  },
  test: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse_test',
    host: '127.0.0.1'
  },
  production: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse',
    host: '127.0.0.1'
  }
}
