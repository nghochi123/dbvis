import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import TableContainer from "../components/for_main/TableContainer";
import ErrorDialog from "../components/for_main/ErrorDialog";
import TableContainerForceRerender from "../context/TableContainerForceRerender";
import { GlobalStateContext, GlobalDispatchContext } from "../context/GlobalContextProvider";
import {checkAuthCG} from '../misc/checkAuth';

import diagrams from "../misc/knex";
import MainLayout from "../layout/mainlayout/MainLayout";

const MainPage = ({ tables, fields, arrows, names, maxtableid, breadcrumbinfo, confirmAuth }) => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const updatedTables = tables.filter((table) => state.dbid === table.db_id);
  const updatedFields = fields.filter((field) => state.dbid === field.db_id);
  const router = useRouter();
  const refresh = () => {
    router.replace(router.asPath);
  };
  useEffect(() => {
    if (!authed) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Not logged in",
          "Please log in or sign up, or use the guest page. Redirecting to login page",
        ],
      });
      setTimeout(() => {
        router.push("/login");
        dispatch({
          type: "TOGGLE_DIALOG",
          payload: [
            "Not logged in",
            "Please log in or sign up, or use the guest page. Redirecting to login page",
          ],
        });
      }, 1000);
    }
  }, []);
  const authed = checkAuthCG(confirmAuth, state.userid, state.userToken);
  let display = <p>You are not logged in.</p>;
  if (authed) {
    display = (
      <div>
      <Head>
        <title>Diagrams</title>
      </Head>
      <TableContainerForceRerender>
        <MainLayout
          tables={updatedTables}
          fields={updatedFields}
          dbname={names}
          refresh={refresh}
          dbid={state.dbid}
          maxtableid={maxtableid}
          breadcrumbinfo={breadcrumbinfo}
        >
          <TableContainer
            tables={updatedTables}
            fields={updatedFields}
            arrows={arrows}
          />
        </MainLayout>
        <ErrorDialog />
      </TableContainerForceRerender>

      </div>
      
    );
  }
  return (
    <>
      {display}
      <ErrorDialog />
    </>
  );
};

export default MainPage;

export const getServerSideProps = async ({ req, query }) => {
  const name_data = await diagrams("tbl")
    .leftJoin("field_data", "tbl.id", "field_data.table_id")
    .leftJoin("db", "tbl.db_id", "db.id")
    .leftJoin("grp", "db.group_id", "grp.id")
    .leftJoin("users", "grp.owner_id", "users.id")
    .select(
      "group_id",
      "username",
      "group_name",
      "db_name",
      "tbl_name",
      "tbl.id as table_id",
      "db_id"
    );
  const names = name_data.map((item) => ({
    db_id: item.db_id,
    table_id: item.table_id,
    concat_dbname: `${item.username}-${item.group_name}-${item.db_name}`,
    table_name: item.tbl_name,
  }));
  const tables = await diagrams("tbl").select();
  const fields = await diagrams("field_data")
    .join("tbl", "field_data.table_id", "tbl.id")
    .select();
  const arrows = await diagrams("field_connection")
    .leftJoin(
      "field_data",
      "field_data.field_name",
      "field_connection.arrow_from"
    )
    .leftJoin("tbl", "field_data.table_id", "tbl.id")
    .select("arrow_from", "arrow_to", "color");
  const breadcrumbinfo = await diagrams('db')
  .select('db.id', 'db_name', 'group_name', 'username')
  .join('grp', 'grp.id', 'db.group_id')
  .join('users', 'grp.owner_id', 'users.id')
  const maxtableid = await diagrams("tbl").max("id", { as: "maxid" });
  const confirmAuth = await diagrams("users")
    .join("user_tokens", "user_tokens.user_id", "users.id")
    .select();
  return {
    props: {
      tables: JSON.parse(JSON.stringify(tables)),
      fields: JSON.parse(JSON.stringify(fields)),
      arrows: JSON.parse(JSON.stringify(arrows)),
      names: JSON.parse(JSON.stringify(names)),
      maxtableid: JSON.parse(JSON.stringify(maxtableid)),
      breadcrumbinfo: JSON.parse(JSON.stringify(breadcrumbinfo)),
      confirmAuth: JSON.parse(JSON.stringify(confirmAuth))
    },
  };
};
