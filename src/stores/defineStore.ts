import { AuthData } from '@utils/types';
import { jwtDecode } from 'jwt-decode';
import {
  createActions,
  createStore,
  getStoreValue,
  setStoreValue,
} from 'pulsy';

createStore<AuthData>('authData', {
  status: 'unknow',
  user: null,
});

export const authDataActions = createActions<AuthData, undefined>('authData', {
  authenticate: state => {
    const token = getStoreValue<string | null>('token');
    if (!token)
      return {
        status: 'guess',
        user: null,
      };

    return {
      status: 'logged',
      user: jwtDecode(token),
    };
  },
});

createStore<MessageDialog | null>('message', null);
createStore('signinModal', false);

//create a store for token issued form the server
createStore<string | null>('token', null, {
  middleware: [
    (next, prev, name) => {
      if (!next)
        setStoreValue('authData', {
          status: 'guess',
          user: null,
        });
      else
        setStoreValue('authData', {
          status: 'logged',
          user: jwtDecode(next!),
        });

      return next;
    },
  ],
  persist: {
    version: 1,
    storage: localStorage,
  },
});

//create a store for theme
createStore('theme', 'ligth', {
  persist: {
    version: 1,
    storage: localStorage,
  },
});

export const signinDialogActions = createActions('signinModal', {
  toggle: (state, action) => !state,
});
