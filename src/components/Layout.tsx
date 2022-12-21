import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div data-theme="dracula" className="flex h-screen flex-col">
      <NavBar />
      <div className="flex-1 sm:px-2 md:px-6 lg:px-8">{children}</div>
    </div>
  );
};

export default Layout;
