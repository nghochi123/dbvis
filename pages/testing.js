import React from "react";
import Head from "next/head";
import TableContainer from "../components/for_main/TableContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import MainLayout from "../layout/mainlayout/MainLayout";

const Test = () => {
  return (
    <>
      <Head>
        <title>Roflmao</title>
      </Head>
      <MainLayout>
        <DndProvider backend={HTML5Backend}>
          <TableContainer/>
        </DndProvider>
      </MainLayout>
    </>
  );
};

export default Test;
