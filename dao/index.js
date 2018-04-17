const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://test:test@localhost:5432/test1');

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  sname: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = {
  models: {
    User
  },
  init() {
    sequelize
      .sync({ force: true })
      .then(() => console.log('DB syncronized'));
  }
};
