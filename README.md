# QuiL - Writing GraphQL for you

QuiL is an open source developer tool that simplfies the process of implementing GraphQL and helps engineers better understand their data base.

### Table of Contents

  -General Information
  -Technologies Used
  -Screenshots
  -How to use
  -To do
  -Contributors

### GraphQL Schema & Resolver Generator

Powered by QuiL's database analyzation algorithm, QuiL is able to use a database connection string and produce nessecary GQL schemas and GQL resolvers a developer would need to start a GraphQL backend

### Technologies Used

  -Next.js 13
  -React.js (React Hooks) - v18.2.0
  -React-flow-renderer - v11.2.0
  -Express - v4.18.2
  -jest - v29.3.1
  -Cypress v11.2.0
  -supertest - v6.1.6
  -Docker
  -Tailwindcss - v3.2.2

### How to use

  1. On the root page you will have the option to input your PostgreSQL database URI or a sample database.
  2. The main page will have the database of your choice rendered.
  3. Center of the dev tool you will be able to visualize and interact with the database.
  4. Above the visualizer off to the right you will have three buttons.
    a. First field allows you to input a PostgreSQL URI followed by a [Launch] button.
    b. Second button [Save] will give you the opportunity to save this project for future use.
    c. Third button [Load] lets you access previously saved projects.
  5. On the top-left hand side you will have a [View Schemas/Resolvers] button that will open a drawer that gives you access to the generated schema types and resolvers generated by QuiL.

### To Do

  -Test metrics
  
  -Be able to use more SQL databases then onto NoSQL.
  
  -Integrate Redis caching.
  



### Contributors

  -Brian Tran             
  
  -Stephen Fitzsimmons     
  
  -Daniel An 
  
  -Andres Jaramillo


