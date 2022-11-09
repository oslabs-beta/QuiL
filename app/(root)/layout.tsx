import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// layout page is where you would fetch data (pretty much acts as app.js where app.js is the parent component)
// global components like NavBar or Footer would live here
// layout page can nested. You can have multiple layouts of sub-directories that would only apply to the children components
// about/ example.com/about
// [slug]/ example.com/{slug} --> represents a dynamic route. [slug] acts as a wild card and usually contains things such as ids or username
// (group)/ example.com(???) --> ignores
