import { createStore } from 'pulsy';

createStore('authData', null);

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
