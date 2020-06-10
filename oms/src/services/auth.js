import { jwtApi } from '@/config/api';
import { httpRequest } from '@/utils/http';

/**
 *  获取长token
 * @param {*}
 */
export function getLongToken() {
  return httpRequest.get(jwtApi.regexAuth, {
    params: {
      regex: jwtApi.authMatchRegex,
    },
  });
}

export async function test(params) {
  try {
    const { data } = await httpRequest.get(
      'test',
      {
        params,
        withCredentials: false,
      },
    );
    return data;
  } catch (e) {
    return false;
  }
}
