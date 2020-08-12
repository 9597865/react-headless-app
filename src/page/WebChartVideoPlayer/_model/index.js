import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import { configure } from 'concent';

export const MODEL_NAME = 'webchartvideoplayer';
export const conModule = () => {
  const con = {
    state,
    reducer,
    computed,
  };
  configure(MODEL_NAME, con);
};
