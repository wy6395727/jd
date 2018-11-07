import Api from "../../axios/api"

const state={
  realname:localStorage.getItem("realname"),
  username:localStorage.getItem("username"),
  ID:localStorage.getItem("ID"),
}

const mutations={
  ["LOGIN_UP"]:(state,data)=>{

    state.username=data.username;
    state.realname=data.realname;
    state.ID=data.ID;
    localStorage.setItem("username",data.username);
    localStorage.setItem("realname",data.realname);
    localStorage.setItem("ID",data.ID);
  },
  ["LOGIN_OUT"]:(state)=>{
    state.realname=null;
    localStorage.removeItem("realname");
    state.username=null;
    localStorage.removeItem("username");
    state.ID=null;
    localStorage.removeItem("ID");
  },
}

const actions={
}

export default {
  state,
  mutations,
  actions
}
