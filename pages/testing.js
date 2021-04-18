import React from "react";
import Head from "next/head";
import TableContainer from "../components/for_main/TableContainer";
import TableContainerForceRerender from "../context/TableContainerForceRerender";

import diagrams from '../misc/knex'
import MainLayout from "../layout/mainlayout/MainLayout";

const Test = ({tables, fields}) => {
  console.log(tables, fields);
  return (
    <>
      <Head>
        <title>Roflmao</title>
      </Head>
      <TableContainerForceRerender>
        <MainLayout>
          <TableContainer tables_dat={tables} fields={fields}/>
        </MainLayout>
      </TableContainerForceRerender>
    </>
  );
};

export default Test;

export const getServerSideProps = async ({ req, query }) => {
  const tables = await diagrams("tbl")
  .select();
  const fields = await diagrams("field_data")
  .select();
  return {
    props: {
      tables: JSON.parse(JSON.stringify(tables)),
      fields: JSON.parse(JSON.stringify(fields))
    },
  };
};
