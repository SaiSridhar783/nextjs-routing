import { Fragment } from "react";
import MainHeader from "./main-header";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>The Next Events | 4.0</title>
      </Head>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
