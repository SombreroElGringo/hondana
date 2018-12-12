import { HANDLE_AUTH } from '../consts/app';

export const handle_auth = auth => {
  return {
    type: HANDLE_AUTH,
    payload: auth,
  };
};
