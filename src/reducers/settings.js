import {
  TOGGLE_OPEN_ITEMS
} from '../actions/settings';

const initialSettings = {
  filterOpenRecords: true
};

export default function settings(state = initialSettings, action) {
  switch (action.type) {

    case TOGGLE_OPEN_ITEMS:
      return Object.assign({}, state, { filterOpenRecords: !state.filterOpenRecords });

    default:
      return state;
  }
}
