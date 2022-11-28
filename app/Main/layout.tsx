import "../(root)/globals.css";
import NavigationBar from "./Chart/(components)/NavigationBar";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
}
