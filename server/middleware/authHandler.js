// Import dummy data for testing
const { users } = require('../db/dummyData');

module.exports = {
  handleSignin: (args, context) => {
    context.user = 'Stephen';
    // const { token } = req.headers;
    // if (token === '123') res.locals.user = { id: 1, name: 'Olive' };
    // const user = users.find(e => e.name === username);
    // if (!user || user.password !== password) return 'Cant sign in';
    // else res.locals.user = user;
    return { token: '123', error: 'No error' };
  },
};
