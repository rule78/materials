window.jkenv = window.jkenv || {
  CART_SEARCH: process.env.CART_SEARCH,
  STOCK_SETTING: process.env.STOCK_SETTING,
  JWT_GATEWAY: process.env.JWT_GATEWAY,
};

function apiUrl(apiName) {
  if (process.env.VUE_ENV === 'client') {
    return `${window.jkenv[apiName]}`;
  }
  return `${process.env[`INTERNAL_${apiName}`]}`;
}

// eslint-disable-next-line
export let {
  jwtApi,
} = {};

export function resetEnv(jkenv) {
  const {
    // eslint-disable-next-line camelcase
    jwt_gateway,
    // eslint-disable-next-line camelcase
    css_authMatchRegex,
    // basic_name: BASIC_NAME,
    // mgmt: MGMT,
  } = jkenv || window.jkenv;
  jwtApi = {
    // eslint-disable-next-line camelcase
    regexAuth: `${jwt_gateway}/jwt`,
    authMatchRegex: css_authMatchRegex,
  };
}

export const JWT_LOCALSTORAGE_KEY = 'css_jwt';

export const authApi = {
  longToken: () => `${apiUrl('jwt_gateway')}/jwt?regex=${apiUrl('css_authMatchRegex')}`,
};

// const displatchHost = 'http://inventory-dispatcher-service.dev.jianke.com';

