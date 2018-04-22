import Api from "../../axios/api"

const state={
  realname:sessionStorage.getItem("realname"),
  username:sessionStorage.getItem("username"),
  ID:sessionStorage.getItem("ID"),
}

const mutations={
  ["LOGIN_UP"]:(state,data)=>{

    state.username=data.username;
    state.realname=data.realname;
    state.ID=data.ID;
    sessionStorage.setItem("username",data.username);
    sessionStorage.setItem("realname",data.realname);
    sessionStorage.setItem("ID",data.ID);
  },
  ["LOGIN_OUT"]:(state)=>{
    state.realname=null;
    sessionStorage.removeItem("realname");
    state.username=null;
    sessionStorage.removeItem("username");
    state.ID=null;
    sessionStorage.removeItem("ID");
  },
}

const actions={
}

export default {
  state,
  mutations,
  actions
}
