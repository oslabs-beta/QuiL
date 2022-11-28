/*---> File Naming Conventions
- All .tsx components should be PascalCase 
- All non tsx files should be camelCase
*/

// No more than 2 empty new lines between code blocks

/* ======================================
--> Variable Conventions
- All variables are camelCased
- Always use const rather than var
- Variable names should be semantic in what they do, favor descriptive names over short ones
*/
const randomNumber = Math.random() * 100;

/* ======================================
 Function Definitions
*/
// Arrow functions
const createGetResolver = (value: number) => {
  console.log(value);
};

// All strings should be single-quote

/* All multi-line comments should use multi-line comments */
// All single line comments should be single-line comments

/* 
Object/Array Conventions: 
- commas at end of key-value pairs in objs and array elements (even if there is only one key-value pair (object) or element (array)
*/

const clients = {
  id: '1',
};

const people = ['Pablo'];

/*
For both if and else statements, if result is one-liner, then keep it single-line
Otherwise, use curly brackets and put the else in the same line as closing curly bracked for if statement
*/
// Ex:
if (clients) {
  console.log(true);
} else {
  console.log(false);
}
