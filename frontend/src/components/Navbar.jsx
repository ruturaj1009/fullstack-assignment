import { Link } from "react-router-dom";
import logo from "../assets/download.jpg";

const Navbar = () => {
  return (
    <div className="navbar bg-white text-blue-900">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            className=" text-xl hidden sm:inline-block font-bold hover:font-bold hover:outline-2 duration-300"
            to="/">
            <img src={logo} style={{height:"60px"}}/>
          </Link>
          <Link className="btn btn-blue normal-case text-xl sm:hidden" to="/">
            R
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal pe-8 m-0 sm:px-1 sm:text-base">
            <li className="outline outline-1 rounded-full font-bold hover:text-black ">
              <Link to="/">Transactions</Link>
            </li>
            <li className="outline outline-1 rounded-full font-bold hover:text-black">
              <Link to="/statistics">Statistics</Link>
            </li>
            {/* <li>
              <Link to="/bar-chart">Bar Chart</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
