import {
  addFakeList,
  queryFakeList,
  removeFakeList,
  updateFakeList
} from "./service";

const Model = {
  namespace: "newtable",
  state: {
    list: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : []
      });
    },
    *delete({ payload }, { call, put }) {
      console.log("caonima");
      const response = yield call(removeFakeList, payload);
      console.log(response);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : []
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: "appendList",
        payload: Array.isArray(response) ? response : []
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;

      const response = yield call(addFakeList, payload); // post
      console.log(response);

      yield put({
        type: "queryList",
        payload: response
      });
    }
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    appendList(
      state = {
        list: []
      },
      action
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    }
  }
};
export default Model;
