module.exports = {
  development: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse_dev',
    host: '192.168.1.32'
  },
  test: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse_test',
    host: '192.168.1.32'
  },
  production: {
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    database: 'warehouse',
    host: '192.168.1.32'
  }
}
