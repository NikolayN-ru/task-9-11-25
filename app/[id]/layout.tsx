import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      layout
      <div>{children}</div>
      <Link href="/">back-back</Link>
    </div>
  );
};

export default Layout;
