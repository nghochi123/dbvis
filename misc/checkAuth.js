const checkAuth = (groups, confirmAuth, userid, token) => {
  const authed = confirmAuth.find((row) => {
    return row.user_id === userid && row.token === token;
  });
  if (authed) {
    return groups.filter((group) => group.userid === userid);
  } else {
    return false;
  }
};

const checkAuthDB = (dbs, confirmAuth, userid, token, groupid) => {
  const authed = confirmAuth.find((row) => {
    return row.user_id === userid && row.token === token;
  });
  if (authed) {
    return dbs.filter((db) => db.group_id === groupid);
  } else {
    return false;
  }
};

const checkAuthCG = (confirmAuth, userid, token) => {
  const authed = confirmAuth.find((row) => {
    return row.user_id === userid && row.token === token;
  });
  return !!authed;
};

export { checkAuth, checkAuthDB, checkAuthCG };
