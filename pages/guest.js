import React, {useState} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import TableContainer from "../components/for_main/TableContainer";
import ErrorDialog from "../components/for_main/ErrorDialog";
import TableContainerForceRerender from "../context/TableContainerForceRerender";
import MainLayout from "../layout/mainlayout/MainLayout";
import {tables, fields, dbname, arrows, breadcrumbinfo} from '../misc/data';

const GuestPage = () => {
    const [newtables, setnewtables] = useState(tables);
    const [newfields, setnewfields] = useState(fields);
    const [newdbname, setnewdbname] = useState(dbname);
    const [newarrows, setnewarrows] = useState(arrows);
    const newmaxtableid = [{maxid: newtables.length}];
    const [newbreadcrumbinfo, setnewbreadcrumbinfo] = useState(breadcrumbinfo);
  const router = useRouter();
  const refresh = () => {
    router.replace(router.asPath);
  };
  console.log(newtables, newfields, newdbname, newarrows, newmaxtableid, newbreadcrumbinfo);
  return (
    <>
      
      <div>
      <Head>
        <title>Guest</title>
      </Head>
      <TableContainerForceRerender>
        <MainLayout
          tables={newtables}
          fields={newfields}
          dbname={newdbname}
          breadcrumbinfo={newbreadcrumbinfo}
          maxtableid={newmaxtableid}
          arrows={newarrows}
          settables={setnewtables}
          setfields={setnewfields}
          setdbname={setnewdbname}
          setbreadcrumbinfo={setnewbreadcrumbinfo}
          setarrows={setnewarrows}
          refresh={refresh}
          dbid={-1}
        >
          <TableContainer
            tables={newtables}
            fields={newfields}
            arrows={newarrows}
            settables={setnewtables}
            setfields={setnewfields}
          />
        </MainLayout>
        <ErrorDialog />
      </TableContainerForceRerender>

      </div>
    </>
  );
};

export default GuestPage;