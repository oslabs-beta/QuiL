const { handleSignin } = require('../../../middleware/authHandler');

module.exports = {
  Mutation: {
    signin: (_, args, context) => handleSignin(args, context),
  },
};
