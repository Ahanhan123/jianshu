import React, {Component} from 'react';
import {connect} from "react-redux";
import {BackTop, HomeLeft, HomeRight, HomeWrapper} from './style'
import Topic from "./components/Topic";
import List from "./components/List";
import Recommend from "./components/Recommend";
import Writer from "./components/Writer";
import {actionCreators} from "./store";
/*import {getHomeInfo} from "./store/actionCreators";*/
class Home extends Component {
    handleScrollTop=()=>{
        window.scrollTo(0,0)
    }
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/5055/348f9e194f4062a17f587e2963b7feb0b0a5a982.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                {this.props.showScroll?<BackTop onClick={this.handleScrollTop}>回顶部</BackTop>:null}

            </HomeWrapper>
        );
    }
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();
    }
    //当页面挂载完毕时，绑定事件
    bindEvents(){
        //在window上绑定
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }
    //当组件即将卸载时，取消事件绑定
    componentWillUnmount() {
        window.removeEventListener('scroll',this.props.changeScrollTopShow)

    }
}
//从store中拿数据
const mapStateToProps=(state)=>({
    showScroll:state.getIn(['home','showScroll'])
})

//此函数返回一个对象，接收一个参数dispatch
const mapDispatchToProps=(dispatch)=>({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop>200){
            dispatch(actionCreators.toggleTopShow(true));
        }else{
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
})
//action通过此流程会发送给store，store会转发给大的reducer，则home的reducer也可以收到

export default connect(mapStateToProps,mapDispatchToProps)(Home);