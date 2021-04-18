import React from "react";

import diagrams from "../misc/knex";

const Hello = ({ users }) => {
  return (
    <div>
      {users.map((i) => {
        return (<div><p>{i.field_name}</p><p>{i.field}</p></div>);
      })}
    </div>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const data = await diagrams("field_data").select();
  const plainData = JSON.parse(JSON.stringify(data));
  return {
    props: {
      users: plainData,
    },
  };
};

export default Hello;
