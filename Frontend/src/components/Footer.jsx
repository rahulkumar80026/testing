
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50  py-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()}, <span className="font-semibold">Logical Learning Company Pvt. Ltd.</span>. All Rights Reserved.
    </footer>
  );
};

export default Footer;
