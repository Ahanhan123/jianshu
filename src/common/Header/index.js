import React, {Component} from 'react';
//connect方法让Header组件与store建立连接
import {connect} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {actionCreators} from './store'
//引入HeaderWrapper组件
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button,

} from "./style";
import {Link} from "react-router-dom";
/*const getListArea=(show)=>{
    if(show){
        return (
            <SearchInfo>
                  <SearchInfoTitle>
                      热门搜索
                      <SearchInfoSwitch>换一批</SearchInfoSwitch>
                  </SearchInfoTitle>
                  <SearchInfoList>
                      <SearchInfoItem>教育</SearchInfoItem>
                      <SearchInfoItem>教育</SearchInfoItem>
                      <SearchInfoItem>教育</SearchInfoItem>
                      <SearchInfoItem>教育</SearchInfoItem>
                      <SearchInfoItem>教育</SearchInfoItem>
                  </SearchInfoList>
            </SearchInfo>
        )
    }else{
        return null
    }
}*/

class Header extends Component {
    getListArea=()=>{
        const {focused,list,page,handleMouseEnter,handleMouseLeave,mouseIn,handleChangePage,totalPage}=this.props;
        //list是immutable数组，有个方法为toJS(),可以转化为正常数组
        const newList=list.toJS()
        const pageList=[];
        //当发送ajax后，list内有数据，才进行循环
        if(newList.length){
            //page为1，从0开始~9，page为2，从10开始~19
            for(let i=(page-1)*10;i<page*10;i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if(focused||mouseIn){
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle >
                        热门搜索
                        <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                           {/* ref可以获取到真实的DOM节点，将此节点icon传递给this.spinIcon*/}
                            <span ref={(icon)=>{this.spinIcon=icon}} className="iconfont spin">&#xe852;</span>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else{
            return null
        }
    }
    render() {
        const {focused,handleInputFocus,handleInputBlur,totalPage,list}=this.props;
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登陆</NavItem>
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide">
                            <NavSearch className={focused ? 'focused' : ''}
                                       onFocus={()=>{handleInputFocus(list)}}
                                       onBlur={handleInputBlur}>
                            </NavSearch>
                        </CSSTransition>
                        <span className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe62d;</span>
                        {this.getListArea()}
                    </SearchWrapper>

                </Nav>
                <Addition>
                    <Button className="writing">
                        <span className="iconfont">&#xe6eb;</span>
                        写文章
                    </Button>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }
}


/*const Header =(props)=>{
    return (
        <HeaderWrapper>
            <Logo href='/'/>
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载App</NavItem>
                <NavItem className='right'>登陆</NavItem>
                <NavItem className='right'>
                    <span className="iconfont">&#xe636;</span>
                </NavItem>
                <SearchWrapper>
                    <CSSTransition
                        in={props.focused}
                        timeout={200}
                        classNames="slide">
                        <NavSearch className={props.focused ? 'focused' : ''}
                                   onFocus={props.handleInputFocus}
                                   onBlur={props.handleInputBlur}>
                        </NavSearch>
                    </CSSTransition>
                    <span className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe62d;</span>
                    {getListArea(props.focused)}
                </SearchWrapper>

            </Nav>
            <Addition>
                <Button className="writing">
                    <span className="iconfont">&#xe6eb;</span>
                    写文章
                </Button>
                <Button className="reg">注册</Button>
            </Addition>
        </HeaderWrapper>
    )

}*/


const mapStateToProps = (state) => {
    return {
        //state.header代表header/reducer返回的数据，
        // 此时已经是immutable数据了，此时要通过.get()
        focused:state.getIn(['header','focused']),//等价于下一行，代表从state中获取header下的focused的值
       /* focused: state.get('header').get('focused')*/
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        totalPage:state.getIn(['header','totalPage']),
        mouseIn:state.getIn(['header','mouseIn'])
    }
};
//组件调用store里的内容就要调用dispatch方法
const mapDispatchToProps=(dispatch)=> {
    return {
        handleInputFocus(list){
            //当列表长度=0才发送ajax请求
            if(list.size===0){
                dispatch(actionCreators.getList());
            }
            //当聚焦的时候，会派发两个action，一个是getList：是一个函数，帮助做一些事情 一个是searchFocus

            //创建action
            /*const action=actionCreators.searchFocus();
            dispatch(action);//发给store，store接收到action，将action和之前的数据都给reducer*/
            //可以直接写为
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
           /* const action=actionCreators.searchBlur()
            dispatch(action)*/
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        //如果当前页小于总的页数，则点击换一换后为page+1页，如果等于总页数，则将当前page改为1
        handleChangePage(page,totalPage,spin){
            //非0~9的数字，替换为空
            let originAngle=spin.style.transform.replace(/[^0-9]/ig,'')
            if(originAngle){
                originAngle=parseInt(originAngle,10)//转换为十进制的数字
            }else{
                originAngle=0;
            }
            //当第一次点击时，transform没有值，originAngle不存在，则设置为0
            //如果已经有这个值了，就转换为正整数
            spin.style.transform='rotate('+(originAngle+360)+'deg)'
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
