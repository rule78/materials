const authInfo = () => {
  let au = {
    username: null,
    account: null,
    authorities: null,
    roles: null,
    token: {},
    err: null,
  };
  if (localStorage && localStorage.getItem('tokenInfo')) {
    let tokenInfo = {};
    try {
      tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    } catch (e) {
      if (window) { window.console.log(e); }
    }
    au = { ...au, ...tokenInfo };
  }
  return au;
};


const auth = {
  namespaced: true,
  state: authInfo,
};

export default auth;
