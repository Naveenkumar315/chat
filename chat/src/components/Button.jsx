import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {

  const baseStyles =
    "font-semibold rounded-md focus:outline-none transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-[#26A0DA] text-white  hover:bg-[#176c9a]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 ",
    danger: "bg-red-600 text-white hover:bg-red-700 ",
    switch: "bg-gray-600 text-white hover:bg-gray-700 w-[150px] ",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
