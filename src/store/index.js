import { createStore } from 'vuex';

export default createStore({
  state: {
    openFiles: [],
  },
  getters: {
    getFile: (state) => (id) => {
      return state.openFiles.find((file) => file.id === id);
    },
  },
  mutations: {
    addFile(state, payload) {
      state.openFiles.push({ ...payload });
    },
    removeFile(state, payload) {
      state.openFiles = state.openFiles.filter(
        (file) => file.id !== payload.id
      );
    },
    updateFileContent(state, payload) {
      state.openFiles.map((file) => {
        if (file.id === payload.id) {
          return payload;
        }
        return file;
      });
    },
  },
  actions: {},
  modules: {},
});
