import { Fragment } from "react";
import MainHeader from "./main-header";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events | 4.0</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
