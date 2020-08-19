import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import { configure } from 'concent';

export const MODEL_NAME = 'webd3chart';

export const conModule = () => {
  const conf = {
    state,
    reducer,
    computed,
  };
  configure(MODEL_NAME, conf);
};
