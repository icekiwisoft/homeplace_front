import { AuthData } from '@utils/types';
import { createActions, createStore, getStoreValue } from 'pulsy';

createStore<AuthData>('authData', {
  status: 'unknow',
  user: null,
});

createStore<MessageDialog | null>('message', null);
createStore('signinModal', false);

//create a store for token issued form the server
createStore('token', null, {
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
      user: null,
    };
  },
});
