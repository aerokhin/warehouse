# Warehouse API Project

This is a NestJS project for managing a warehouse. It utilizes the NestJS framework along with Sequelize for database interaction.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://www.mysql.com/) server
- [Sequelize](https://sequelize.org)

### Installation

Clone the repository:

```sh
git clone https://github.com/your-username/warehouse.git
cd warehouse
```

### Configuring MySQL Server

1. Make sure your MySQL server is set up and running.
2. Modify config files to configure MySQL server connection settings. Files location:
* `/config/*.yml`
* `/db/config/config.js` (this file is used by `sequelize-cli`)
3. Check that the IP address you used appears in the result of this SQL query:
```
SELECT host FROM mysql.user WHERE User = 'root';
```
4. Make sure the IP address you set in the MySQL server configuration is accessible from the Docker container. If it's not, the container won't be able to connect to the MySQL server.

### Run docker

1. Run Docker container

```sh
docker build -t warehouse-api .
docker run -p 8001:8001 warehouse-api
```
2. For testing, the database will be recreated every time you create a Docker.

### Example of requests

1. Add products
```
POST http://localhost:8001/products
```
```json
{
    "section": "AA-1",
    "products": [ "SM L10001", "SM L10001", "SM L10002" ]
}
```
2. Remove products
```
DELETE http://localhost:8001/products
```
```json
{
    "section": "AA-1",
    "products": [ "SM L10001" ]
}
```
3. Get product location
```
GET http://localhost:8001/products/location?id=L10001%20SM&qty=2
```

### E2E Tests
```sh
npm test
```
