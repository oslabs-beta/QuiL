// Import dummy data for testing
const { users } = require('../db/dummyData');

module.exports = {
  auth: (req, res, next) => {
    const { token } = req.headers;
    if (token === '123') res.locals.user = { id: 1, name: 'Olive' };
    // const user = users.find(e => e.name === username);
    // if (!user || user.password !== password) return 'Cant sign in';
    // else res.locals.user = user;
    return next();
  },
};
