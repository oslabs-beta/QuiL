
export const dummyResolvers =  [
    'users: () => db.get("users")',
    'user: (_, args) => db.get({user: args.id})',
  ]

export const dummySchemas = [
  'type User { name: String, age: Int }',
  'type Users { users: [User] }',
  'type Query { users: Users, user(id: Int): User }',
]

