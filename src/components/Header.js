import React from "react";


// arrow function with implicit return
// 'tagline' is deconstructed from props input
const Header = ({tagline}) => (
  <header className="top">
    <h1>Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day</h1>
      <h3 className="tagline">
        <span>{tagline}</span>
      </h3>
    </header>
);

export default Header;
