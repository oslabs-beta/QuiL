import Link from 'next/link';
const NavigationBar = () => {
  return (
    <div className="NavBar">
      <li className="NavBarList">
        <Link href="/">🐺</Link>
      </li>
      <li className="NavBarList">
        <Link href="/Login">Login</Link>
      </li>
      <li className="NavBarList">
        <Link href="/Register">Register</Link>
      </li>
      <li className="NavBarList">
        <Link href="/About">About</Link>
      </li>
    </div>
  );
};

export default NavigationBar;
