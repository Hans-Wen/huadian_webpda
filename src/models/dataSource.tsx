import { Reducer } from 'redux';
export interface StateType {
  data: API.StationInfo[];
}

export interface ModelType {
  state: StateType;
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
