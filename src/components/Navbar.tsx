import React from "react";
import reactLogo from "../assets/react.svg";

const Navbar = (): React.JSX.Element => {
  return (
    <nav className="flex items-center justify-center h-20 w-screen bg-gray-800 cursor-default">
        <img className="reactLogo h-8 w-auto" src={reactLogo} />
        <h1 className="project-name">react project</h1>
    </nav>
  );
};

export default Navbar;
