import React from "react";

// React.FC => generic, é um tipo do typescript que permite
// receber um parametro (propriedades)

interface HeaderProps {
  title: String;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
