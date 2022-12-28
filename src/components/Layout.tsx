import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="container mx-auto flex flex-1 flex-col px-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
