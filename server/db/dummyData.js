module.exports = {
  dummyResolvers: [
    'users: () => db.get("users")',
    'user: (_, args) => db.get({user: args.id})',
  ],
  dummySchemas: [
    'type User { name: String, age: Int }',
    'type Users { users: [User] }',
    'type Query { users: Users, user(id: Int): User }',
  ],
  users: [{ id: 1, name: 'Olive', password: '123' }],
};
