import axios from "axios";
import * as constants from "./constants";
import {fromJS} from "immutable";
/*import {List} from 'immutable';*/
//List 方法和fromJS方法都可以将数组转换为immutable方法

const changeHomeData=(result)=>({
    type:constants.CHANGE_HOME_DATA,
    topicList:result.topicList,
    articleList:result.articleList,
    recommendList:result.recommendList
})
const addHomeList=(list,nextPage)=>({
    type:constants.ADD_ARTICLE_LIST,
    list:fromJS(list),
    nextPage
})

export const getHomeInfo=()=>{
    return (dispatch)=>{
        axios.get('/api/home.json')
            .then((res)=>{
                const result=res.data.data;
                dispatch(changeHomeData(result))
            })
    }
}
export const getMoreList=(page)=>{
    return (dispatch)=>{
        /*在请求接口时，添加一个参数项page*/
        axios.get('/api/homeList.json?page='+page)
            .then((res)=>{
                const result=res.data.data;
                //更改store里的内容：创建action再dispatch派发出去 也就是reduce.js
                //在派发时，除了给他result，还把下一页的页码给了他
                dispatch(addHomeList(result,page+1))
            })
    }
}
export const toggleTopShow=(show)=>({
    type:constants.TOGGLE_SCROLL_TOP,
    show
})

