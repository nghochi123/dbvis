const checkAuth = (groups, confirmAuth, userid, token) => {
    //groups has group id, group name, owner id, user id, group id.
    //confirmauth has username, email, password, user id, token.
    //token has just the token.
    //Confirming token with confirmauth
    const authed = confirmAuth.find(row=>{
        return row.user_id === userid && row.token === token;
    });
    if(authed){
        return groups.filter(group=>group.userid === userid);
    }
    else{
        return false;
    }
}

const checkAuthDB = (dbs, confirmAuth, userid, token, groupid) => {
    const authed = confirmAuth.find(row=>{
        return row.user_id === userid && row.token === token;
    });
    if(authed){
        return dbs.filter(db=>db.group_id === groupid);
    }
    else{
        return false;
    }
}

export {
    checkAuth,
    checkAuthDB
}
