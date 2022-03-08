import * as constants from './constants'
import axios from 'axios'
import {fromJS} from "immutable";
import {actionCreators} from "./index";

export const searchFocus=()=>({
    type:constants.SEARCH_FOCUS
});
export const searchBlur=()=>({
    type:constants.SEARCH_BLUE
})
const changeList=(data)=>({
    type:constants.CHANGE_LIST,
    data:fromJS(data),//将数据改为immutable类型的
    totalPage:Math.ceil(data.length/10)//每页10个，一个多少页，取整
})

export const mouseEnter=()=>({
    type:constants.MOUSE_ENTER
})

export const changePage=(page)=>({
    type:constants.CHANGE_PAGE,
    page
})

export const  mouseLeave=()=>({
    type:constants.MOUSE_LEAVE
})
//用了redux-thunk 可以返回一个函数而不是对象，此函数可以接收到一个dispatch方法
export const getList=()=>{
    return (dispatch)=>{
        //第三方模块 需要安装axios npm i sxios
        axios.get('/api/headerList.json')
            .then((res)=>{
                const data=res.data;
                dispatch(changeList(data.data))
            })
            .catch((err)=>{
                console.log('error')
            })
    }
}
