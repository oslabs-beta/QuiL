import "../(root)/globals.css";
import NavigationBar from "./Chart/(components)/NavigationBar";
export default function MainLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
