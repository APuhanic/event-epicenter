import React from "react";
import Image from "next/image";

const Header = () => {
  const headerStyle = {
    backgroundColor: "rgb(37, 31, 31)",
    color: "white",
    padding: "0.75rem",
    textAlign: "center",
  };

  return (
    <header className="flex flex-col items-center" style={headerStyle}>
      <div>
        <Image
          src="/logo.png"
          alt="Epicenter Logo"
          width={480}
          height={180}
        />
      </div>
    </header>
  );
};

export default Header;
