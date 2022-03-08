import {combineReducers} from "redux-immutable";
import {reducer as headerReducer}from '../common/Header/store'
import homeReducer from '../pages/home/store/reducer'
import {reducer as detailReducer} from '../pages/detail/store'
//redux-immutable生成了和redux一样的combineReducers()
//生成的reducer里的数据内容就是immutable里的数据内容
const reducer= combineReducers({
    header:headerReducer,
    home:homeReducer,
    detail:detailReducer
})
export default reducer;