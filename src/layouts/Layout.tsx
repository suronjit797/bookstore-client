import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "./layout.css";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main> {children} </main>
      <Footer />
    </div>
  );
};

export default Layout;
