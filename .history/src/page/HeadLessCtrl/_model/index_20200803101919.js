import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import { configure } from 'concent';

export const MODEL_NAME = 'headlessctrl';
export const conModule = () => {
  configure(MODEL_NAME, { state, reducer, computed  });
};
