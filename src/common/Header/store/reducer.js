import * as constants from './constants'
import {fromJS} from "immutable";
import {CHANGE_PAGE} from "./constants";
//immutable库中提供了一个fromJS()方法，可以将一个js对象转化为immutable对象
//store里的默认数据
const defaultState=fromJS({
    focused:false,
    mouseIn:false,
    list:[],//此时由于fromJS,此数组为immutable数组
    page:1,//展示list的时候只展示一页
    totalPage:1
})
export default (state=defaultState,action)=>{
    //大量的if可以改为switch语句
    switch (action.type){
        case constants.SEARCH_FOCUS:
            //此时state对象已经是一个immutable对象了
            //immutable对象的set方法会结合之前immutable对象的值和设置的值，返回一个全新的对象
            return state.set('focused',true);
        case constants.SEARCH_BLUE:
            return state.set('focused',false);
        case constants.CHANGE_LIST:
            return state.merge({
                list:action.data,
                totalPage:action.totalPage
            })
        case constants.MOUSE_ENTER:
                return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
                return state.set('mouseIn',false);
        case constants.CHANGE_PAGE:
                return state.set('page',action.page);
        default:return state;
    }

    /*if(action.type===constants.MOUSE_ENTER){
        return state.set('mouseIn',true)
    }
    if(action.type===constants.MOUSE_LEAVE){
        return state.set('mouseIn',false)
    }
    if(action.type===constants.CHANGE_PAGE){
        return state.set('page',action.page)
    }*/
}