import React from "react";
import Head from "next/head";
import {useRouter} from 'next/router';
import TableContainer from "../components/for_main/TableContainer";
import ErrorDialog from '../components/for_main/ErrorDialog';
import TableContainerForceRerender from "../context/TableContainerForceRerender";

import diagrams from '../misc/knex'
import MainLayout from "../layout/mainlayout/MainLayout";

const MainPage = ({tables, fields, arrows, names}) => {
  console.log(names, tables);
  const router = useRouter();
  const refresh = () => {
    router.replace(router.asPath);
  }
  return (
    <>
      <Head>
        <title>Roflmao</title>
      </Head>
      <TableContainerForceRerender>
        <MainLayout tables={tables} fields={fields} dbname={names} refresh={refresh}>
          <TableContainer tables={tables} fields={fields} arrows={arrows}/>
        </MainLayout>
        <ErrorDialog/>
      </TableContainerForceRerender>
    </>
  );
};

export default MainPage;

export const getServerSideProps = async ({ req, query }) => {
  const name_data = await diagrams('tbl')
  .leftJoin('field_data',  'tbl.id', 'field_data.table_id')
  .leftJoin('db', 'tbl.db_id', 'db.id')
  .leftJoin('grp', 'db.group_id', 'grp.id')
  .leftJoin('users', 'grp.owner_id', 'users.id')
  .select('group_id', 'username', 'group_name', 'db_name', 'tbl_name', 'tbl.id as table_id', 'db_id')
  const names = name_data.map(item => ({
    db_id: item.db_id,
    table_id: item.table_id,
    concat_dbname: `${item.username}-${item.group_name}-${item.db_name}`,
    table_name: item.tbl_name
  }));
  const tables = await diagrams("tbl")
  .select();
  const fields = await diagrams("field_data")
  .select();
  const arrows = await diagrams("field_connection")
  .leftJoin('field_data', 'field_data.field_name', 'field_connection.arrow_from')
  .leftJoin('tbl', 'field_data.table_id', 'tbl.id')
  .select('arrow_from', 'arrow_to', 'color');
  return {
    props: {
      tables: JSON.parse(JSON.stringify(tables)),
      fields: JSON.parse(JSON.stringify(fields)),
      arrows: JSON.parse(JSON.stringify(arrows)),
      names: JSON.parse(JSON.stringify(names))
    },
  };
};
