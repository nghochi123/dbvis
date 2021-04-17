import React from "react";
import Head from "next/head";
import TableContainer from "../components/for_main/TableContainer";
import TableContainerForceRerender from "../context/TableContainerForceRerender";

import MainLayout from "../layout/mainlayout/MainLayout";

const Test = () => {
  return (
    <>
      <Head>
        <title>Roflmao</title>
      </Head>
      <TableContainerForceRerender>
        <MainLayout>
          <TableContainer />
        </MainLayout>
      </TableContainerForceRerender>
    </>
  );
};

export default Test;
