/* eslint no-return-assign: 0 */
import { extendObservable } from "mobx";
import { initialState, YourModel as model } from "../models/YourModel";
import { YourActions as actions } from "../actions/YourActions";

class YourStore {
  constructor() {
    extendObservable(this, {
      ...model(),
      ...actions(this, initialState)
    });
  }
}

export default YourStore;
