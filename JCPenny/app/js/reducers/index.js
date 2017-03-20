
import { combineReducers } from 'redux';

import cardNavigation from './cardNavigation';
//import list from './list';
import plp from './plp';
import pdp from './pdp';
import department from './department';

export default combineReducers({

  //list,
  cardNavigation,
  plp,
  department,
  pdp
});
