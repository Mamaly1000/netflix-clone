import React from "react";

const Menu = ({ visible = false }: { visible?: boolean }) => {
  if (!visible) return null;
  return <div></div>;
};

export default Menu;
