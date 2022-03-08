import {fromJS} from "immutable";
import * as constants from "./constants";
const defaultState=fromJS({
    topicList:[],
    articleList:[],
    recommendList:[],
    articlePage:1,
    showScroll:false
})
export default (state=defaultState,action)=>{
    switch (action.type){
        case constants.CHANGE_HOME_DATA:
            return state.merge({
                topicList:fromJS(action.topicList),
                articleList:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList),
            });
        case constants.ADD_ARTICLE_LIST:
            return state.merge({
                articleList:state.get('articleList').concat(action.list),
                articlePage:action.nextPage
            });
            /*return state.set('articleList',state.get('articleList').concat(action.list))
            //在articleList后面追加*/
        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll',action.show)
        default:return state;
    }
}

//state.set('topicList',fromJS(action.topicList))
//代表将topList里的数据更改为action传来的topicList，并且由于action.topicList是普通对象，要转为immutable对象
//使用方法fromJS()
//immutable对象有一个方法是merge，它可以同时改变多个属性值