import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="bg-red-300 text-red-900">{children}</button>;
};

export default Button;
