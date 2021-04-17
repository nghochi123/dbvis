import React from "react";

import diagrams from "../misc/knex";

const Hello = ({ users }) => {
    console.log(users);
  return (
    <div>
      {users.map((i) => {
        return <div>{i.username}</div>;
      })}
    </div>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const data = await diagrams("users").select();
  const plainData = JSON.parse(JSON.stringify(data));
  return {
    props: {
      users: plainData,
    },
  };
};

export default Hello;
