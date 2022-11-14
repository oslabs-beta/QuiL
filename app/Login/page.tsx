import '../(root)/globals.css';

import NavigationBar from '../Main/(components)/NavigationBar';
export default function Page() {
  return (
    <div>
      <NavigationBar isLogged={false}/>
      <h1> inside the login page </h1>
    </div>
  );
}
