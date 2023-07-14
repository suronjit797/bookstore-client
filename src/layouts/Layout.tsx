import "./layout.css";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header"></header>
      <main> {children} </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
