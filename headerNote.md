1.安装 styled-components
    npm i styled-components
2.将index.css改为style.js
3.在style.js文件中写入
    import {injectGlobal} from "styled-components";
    injectGlobal`
        body {
        margin: 0;
        }
    `;
-----！这样写的好处：样式仅作用于这一个组件，对其他地方无影响
4.将reset css也加入其中
5.创建common文件夹，在common文件夹中创建组件文件夹

----------组件文件夹

1.创建index.js 和style.js
2.在style.js文件中写入
    import styled from "styled-components";
    //创建一个HeaderWrapper组件，此组件相当于一个div标签，
    //它带有样式，并把它暴露出去
    export const HeaderWrapper=styled.div`
    position: relative;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
    `

-----------图片
//在style.js中引入图片路径
import logoPic from '../../statics/logo.png'

//单独创建一个组件，图片放在<a>内
export const Logo=styled.a`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width:100px ;
    height: 56px;
    background: url(${logoPic});
    background-size: contain;
`;

-----------属性
方法一：
        {/*点击logo图片回到首页 也就是根路径*/}
        <Logo href='/'/>
方法二：
        {/*组件加属性 attrs内传入对象*/}
        export const Logo=styled.a.attrs({
            href:'/'
        })`
        position: absolute;
        top: 0;
        left: 0;
        `;

----------左浮动和右浮动 一起写
此navItem组件有classname为left和right
export const NavItem=styled.div`
    &.left{
        float:left;
    }
    &.right{
        float: right;
    }
`;

----------此组件的属性 的样式
export const NavSearch=styled.input.attrs({
    placeholder:'搜索'
    })`
    width: 160px;
    height: 38px;
    &::placeholder{
    color: #999;
    }
`

------------icon图标的使用(尽量不更改文件为js，会出错)
1.在icon.cn网站中创建项目文件夹，将需要的图标加入到购物车，再加入到项目文件夹中
2.下载到本地，将其中除了demo.html icon.js demo.css文件留下
3.放入到static文件夹中的iconfont文件夹
4.将iconfont.css文件改为js
5.在iconfont.js文件中加入import { createGlobalStyle } from "styled-components";
6.在index.js文件中import此文件
ps：demo_index文件中有使用说明

----------SearchWrapper组件下的iconfont组件
export const SearchWrapper=styled.div`
    position: relative;
    float: left;
    border: 1px solid red;
    .iconfont{
    position:absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    }
`;

----------利用状态设置不同情况下的css------------------
class Header extends Component {
    state={
        focused:false
    }
    render() {
        return (
            <HeaderWrapper>
                <SearchWrapper>
                    <NavSearch className={this.state.focused ? 'focused' : ''}></NavSearch>
                    <span className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe62d;</span>
                </SearchWrapper>
            </SearchWrapper>
        )
    }
};
export const SearchWrapper=styled.div`
    position: relative;
    float: left;
    border: 1px solid red;
    .iconfont{
        position:absolute;
        right: 5px;
        bottom: 5px;
        width: 30px;
        &.focused{
            background: #777;
            color: white;
        }
    }
`;
export const NavSearch=styled.input.attrs({
    placeholder:'搜索'
    })`
    float: left;
    width: 160px;
    height: 38px;
    }
    &.focused{
        width:240px ;
    }
`;

----------加动画效果
1.安装 npm i react-transition-group
2.在github上找到react-transition-group 找到Main document文档
3.引入组件 import {CSSTransition} from "react-transition-group";
4.在需要过渡效果的地方的外侧包裹上CSSTransition组件
5.组件属性：timeout：过渡时长  in：出入场动画 
    classNames={{
        appear: 'my-appear',
        appearActive: 'my-active-appear',
        appearDone: 'my-done-appear',
        enter: 'my-enter',
        enterActive: 'my-active-enter',
        enterDone: 'my-done-enter',
        exit: 'my-exit',
        exitActive: 'my-active-exit',
        exitDone: 'my-done-exit',
    }}
6.在父组件<SearchWrapper>上写以下代码：
    <CSSTransition>会在某些时刻自动的向子组件<NavSearch>添加以下类名
    .slide-enter{//第一个时刻
        transition: all .2s ease-out;//ease-out动画效果
    }
    .slide-enter-active{//动画执行完
        width: 240px;
    }
    //移出
    .slide-exit{//第一个时刻
        transition: all .2s ease-out;//ease-out动画效果
    }
    .slide-exit-active{//动画执行完
        width: 160px;
    }
则可以直接写在<NavSearch>的样式下，但是前缀要加一个&，因为是同级关系


--------------redux的基本使用
1.安装：npm i redux  npm i react-redux
2.页面从store里取数据，首先派发一个action给store，store把action和之前的数据一起给到reducer，
  reducer和action和之前的数据一起返回一个新的数据给到store，store在更新自己的数据后告诉页面我的数据被更新了，
  此时页面也进行相应的更新
3.创建store，在src文件夹下创建store文件夹，在store下创建index.js 用来创建store的实例
4.index.js内写：
        import {createStore} from "redux";
        import reducer from './reducer'
        //创建store实例，并传入一个reducer给他，也就是手册
        const store =createStore(reducer);
        export default store;
5.在store下创建reducer.js 内写：
        //store里的默认数据
        const defaultState={
            focused:false
        };
        export default (state=defaultState,action)=>{
            return state;
        }
ps：reducer要导出一个纯函数：给定固定的输入就会有固定的输出，同时不要具有副作用
    此纯函数有两个参数，state，action
6.此时创建好了store，让组件从store里取数据，向store里存数据
7.在App.js中：引入Provider和store，并修改入口文件，在最外层加一个Provider
        import {Provider} from "react-redux";
        import store from './store/index'；
        class App extends Component {
            render() {
                return (
                    //redux里有一个核心组件叫Provider，它里的所有组件都有能力去使用store里的数据
                    //也可以说为Provider组件将store里的数据都提供给了内部组件
                    <Provider store={store}>
                        <Header/>
                    </Provider>
                    );
                }
        }
        export default App;
8.Provider把store提供给了Header组件，同时也要建立连接：
  在Header组件中的index.js文件中引入：
        //connect方法让Header组件与store建立连接
        import {connect} from "react-redux";

当Header组件和store做连接时， store里的数据如何映射到Props上面
state就是store里的所有数据

        const mapStateToProps=(state)=>{
            return {
                focused:state.focused;
            }
        }

Header组件改变store里的内容就要调用dispatch方法，
将dispatch方法都写在mapDispatchToProps里面
        const mapStateToProps=(state)=>{
            return {}
        }  
        const mapDispatchToProps=(dispatch)=> {
            return {}
        }

        export default connect(mapStateToProps,mapDispatchToProps)(Header);
9.将Header里 index.js 文件中的 state删除掉 写在reducer.js 的defaultState中
    const mapStateToProps=(state)=>{
        return {
            //将仓库store中的state.focused映射到props去，名字叫focused
            focused:state.focused;
        }
    }  
将所有的this.state.focused改为this.props.focused
10.将更改state的函数删掉，handleInputFocus等，将处理函数放到props中，
    <NavSearch className={this.props.focused ? 'focused' : ''}
        onFocus={this.props.handleInputFocus}
        onBlur={this.props.handleInputBlur}>
    </NavSearch>
    将处理函数定义到mapDispatchToProps中，才可以调用dispatch方法
    const mapDispatchToProps=(dispatch)=> {
        return {
            handleInputFocus(){
                const action={
                    type:'search_focus'
                };
                dispatch(action);//发给store，store接收到action，将action和之前的数据都给reducer
            },
            handleInputBlur(){
                const action={
                    type:'search_blur'
                };
                dispatch(action)
            }
        }
    }
在reducer.js文件中：
    export default (state=defaultState,action)=>{
        if(action.type==='search_focus'){
            return {
                focused: true
            }
        }
        if(action.type==='search_blur'){
            return {
                focused: false
            }
        }
        return state;
    }
11.此时Header组件是一个函数式（无状态）组件，可以改写为：并将所有的this.props改为props
   const Header = (props)=>{
    return(
        //内容
    )
   }
可以将之前的组件删掉,并将最顶部引入的component删掉，但一定不要删掉react

-------------使用redux-devtools
在github搜索redux-devtools-extend
在store下的 index.js文件中：
    import {createStore,compose} from "redux";
    import reducer from './reducer'
    const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
    const store =createStore(reducer,composeEnhancers());
    export default store;
compose是一个包装函数，此函数中传递很多方法，会依次执行
此时扩展程序即可使用

----------------拆分reducer
1.由于reducer下存放过多的数据造成代码的不可维护，所以要拆分reducer
2.把与header组件有关的reducer放到header中的reducer里去
    a.在每一个单独的组件文件夹下创建一个store文件夹，内添加一个reducer.js文件，这是一个小记事本
    b.将与本组件相关的reducer放入到此文件中
3.对各小的reducer进行整合
    在原来的store文件夹下的reducer.js文件中写入：
        import {combineReducers} from "redux";
        import headerReducer from '../common/Header/store/reducer'
        const reducer= combineReducers({
            header:headerReducer
        })
        export default reducer;
4.在header下的store下创建一个index.js文件，导出reducer.js
  此时相当于出口文件：
        import reducer from './reducer'
        export {reducer}
    也就是说向引用reducer，不要直接引用store下的reducer，
    而是通过引用index.js，间接引用reducer
    这样的好处是，在大reducer中引入headerReducer时，直接引用store下的index.js,此时目录结构会变少
    import {reducer as headerReducer}from '../common/Header/store'
5.并且将header组件下的index.js此处改为：（因为多了一层header）
    const mapStateToProps = (state) => {
        return {
            focused: state.header.focused
        }
    };
ps：此文件所存放的所有内容都在reducer.js文件下

------------帮助创建reaction

1.在header组件下的store文件夹下创建actionCreators.js文件，帮助创建reaction
2.actionCreator是一个函数，它返回一个对象，可以写为()=({})
3.将header中的action移过来
    export const searchFocus=()=>({
        type:'search_focus'
    })
    export const searchBlur=()=>({
        type:'search_blur'
    })
4.修改header中的index.js文件：
    import * as actionCreators from './store/actionCreators'
    const mapDispatchToProps=(dispatch)=> {
        return {
            handleInputFocus(){
                //创建action
                const action=actionCreators.searchFocus();
                dispatch(action);//发给store，store接收到action，将action和之前的数据都给reducer
            },
            handleInputBlur(){
                const action=actionCreators.searchBlur()
                dispatch(action)
            }
        }
    }
5.actionCreators里的type后的字符串更改为常量
    在header组建的store中创建constants.js,写入：
            export const SEARCH_FOCUS='header/SEARCH_FOCUS';
            export const SEARCH_BLUE='header/SEARCH_BLUR';
    在actionCreators.js中内容更改为：
        import * as constants from './constants'
        export const searchFocus=()=>({
            type:constants.SEARCH_FOCUS
        });
        export const searchBlur=()=>({
            type:constants.SEARCH_BLUE
        })
    在header下的reducer.js文件中加入
        import * as constants from './constants'
    并且更改type为constants.SEARCH_FOCUS和constants.SEARCH_BLUE

-----------使得header/store的index.js为唯一出口文件
    在此文件下写入：
    import reducer from './reducer'
    import * as constants from "./constants";
    import * as actionCreators from './actionCreators'
    export {reducer,constants,actionCreators}
    此时此文件就引入了该store文件夹下的所有文件，并且都做了导出
    此时，将index.js 引入actionCreators 改为 import {actionCreators} from './store'

----------------immutable.js
1.不可变更的，第三方库，npm i immutable 会生成一个immutable对象
2./header/store/reducer.js写入：
    import {fromJS} from "immutable";
3.immutable库中提供了一个fromJS()方法，可以将一个js对象转化为immutable对象
        //store里的默认数据
        const defaultState=fromJS({
            focused:false
        })
4.再想使用就不能直接.focused调用了，而要.get()
    const mapStateToProps = (state) => {
        return {
            //state.header代表header/reducer返回的数据，
            // 此时已经是immutable数据了，此时要通过.get()
            focused: state.header.get('focused')
        }
    };
5.同时在header/reducer里采用.set()对reducer对state进行变更
6.此时书写不够规范，state是一个js对象获取到的header，state.header是一个immutable对象
  要将state也改为immutable对象,state是由大store下的reducer.js中创建的
  安装 npm i redux-immutable
更改  import {combineReducers} from "redux"; 为 import {combineReducers} from "redux-immutable";
    //redux-immutable生成了和redux一样的combineReducers()
    //生成的reducer里的数据内容就是immutable里的数据内容
    const reducer= combineReducers({
        header:headerReducer
    })
7.header/store/index.js中更改
    此时state已经是一个immutable对象，要用get()获取header
    focused:state.getIn(['header','focused'])//等价于下一行，代表从state中获取header下的focused的值
    /* focused: state.get('header').get('focused')*/


-------------------使用redux-thunk
1.header/store/reducer.js 中 state添加一个空数组 list:[]
2.当focused的时候要获取ajax数据，在onfocus事件的处理函数handleInputFocus中
    使用redux-thunk 把异步操作都放在action中处理
    npm i redux-thunk
3.中间件是指：action和store之间，对dispatch方法的升级，创建store的时候使用
4.在大store下的index.js文件中创建的store，在此使用thunk
    import thunk from "redux-thunk";

redux提供了一个方法叫applyMiddleware
    import {createStore,compose,applyMiddleware} from "redux";
    
在composeEnhancers中使用applyMiddleware,使用中间件thunk
    const store =createStore(reducer,composeEnhancers(
        applyMiddleware(thunk)
    ));

--------------ajax获取推荐数据
1. 创建action
  handleInputFocus(){
    //当聚焦的时候，会派发两个action，一个是getList：是一个函数，帮助做一些事情 一个是searchFocus
    //创建一个action
    dispatch(actionCreators.getList());
    dispatch(actionCreators.searchFocus());
2. 定义函数：header/store/actionCreactors
   //用了redux-thunk 可以返回一个函数而不是对象，此函数可以接收到一个dispatch方法
   export const getList=()=>{
      return (dispatch)=>{
        //第三方模块 需要安装axios npm i sxios
        //并引入 
      }
   }
3. 创建假数据：
    /public下创建api文件夹，创建headerList.json文件，在里边随意放一些数据
    待后端开发完后，把这个删除，以后端接口好为主
4. 用得到的json结果替换掉原来的空数组：
   改store里的数据：action->store->reducer
        a.创建一个action 由actionCreators 创建 
         （此时文件正好处于actionCreators）
             const changeList=(data)=>({
                type:'change_List',
                data//返回data
             })
         b.派发给store 使用dispatch()
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
         c.创建好数据后，action会传递给reducer
           if(action.type===constants.CHANGE_LIST){
              return state.set('list',action.data)
           }
           ps：此时
               const defaultState=fromJS({
                    focused:false,
                    list:[]//此时由于fromJS,此数组为immutable数组
               })
           所以要将
               const changeList=(data)=>({
                   type:constants.CHANGE_LIST,
                   data:fromJS(data)//将数据改为immutable类型的
               })
5. 取数据然后循环展示数据
   const mapStateToProps = (state) => {
     return {
       focused:state.getIn(['header','focused']),
       list:state.getIn(['header','list'])
     }
   };
6. 展示数据：
   <SearchInfoList>
      {
          this.props.list.map((item)=>{
              return <SearchInfoItem key={item}>{item}</SearchInfoItem>
          })
      }
   </SearchInfoList>

----------------换一换功能
1.当聚焦时，展示数据，此时应该传入一个page和totalPage，一个是当前页，一个是总共页数
  在reducer.js的defaultPage中
2.聚焦时，有一个函数是changeList，在actionCreators中
    const changeList=(data)=>({
        type:constants.CHANGE_LIST,
        data:fromJS(data),//将数据改为immutable类型的
        totalPage:Math.ceil(data.length/10)//每页10个，一个多少页，取整
    })
3.并且reducer.js中添加
    if(action.type===constants.CHANGE_LIST){
        return state.set('list',action.data).set('totalPage',action.totalPage)
    }
4.分页完成，展示数据 :
    /header/index.js
    getListArea()内添加：
        //list是immutable数组，有个方法为toJS(),可以转化为正常数组
        const newList=list.toJS()
        const pageList=[];
        //page为1，从0开始~9，page为2，从10开始~19
        for(let i=(page-1)*10;i<page*10;i++){
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            )
        }
5.此时在<SearchInfoList>内的map可以删掉，直接展示pageList
        <SearchInfoList>
            {pageList}
        </SearchInfoList>
6.当点击换一换时，input框会失焦，所以列表框的展示还依赖于mouseenter和mouseleave
    a>.mouseenter
        1.在组件添加onMouseEnter事件<SearchInfo onmouseEnter={handleMouseEnter}>
        2.当移入时，将数据项的mouseIn由false改为true
          同时要在const mapDispatchToProps里面写 handleMouseEnter函数并且派发一个action
            handleMouseEnter(){
                dispatch(actionCreators.mouseEnter());
            }
        3.在actionCreators里创建：
            export const mouseEnter=()=>({
                type:constants.MOUSE_ENTER
            })
            并在constants里建立MOUSE_ENTER：
            export const MOUSE_ENTER='header/MOUSE_ENTER';
        4.此action一定会传递给store，store传递给reducer，则在reducer里添加：
            if(action.type===constants.MOUSE_ENTER){
                return state.set('mouseIn',true)
            }
    b>.mousemove
7.以前是focused控制搜索栏是否显示，现在还有mouseIn这个变量,
  从state中获取header下的mouseIn的值
    在mapStateToProps中写mouseIn:state.getIn(['header','mouseIn'])
  并在判断的地方写为：if(focused||mouseIn)
8.给’换一批‘添加点击事件,并进行相关函数操作，如上
  当更改页面时，要获取到当前页面，以及总页面
    所以onclick要传递一个回调函数，以便传入参数
    <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage)}>换一批</SearchInfoSwitch>
9.//如果当前页小于总的页数，则点击换一换后为page+1页，如果等于总页数，则将当前page改为1
    handleChangePage(page,totalPage){
        if(page<totalPage){
            dispatch(actionCreators.changePage(page+1));
        }else{
            dispatch(actionCreators.changePage(1));
        }
    }
    此时在actionCreators中传递page
        export const  changePage=(page)=>({
            type:constants.CHANGE_PAGE,
            page
        })
    并且将page传递给reducer,将action.page传递给新的页码
        if(action.type===constants.CHANGE_PAGE){
            return state.set('page',action.page)
        }
--------解决<SearchInfoItem>中的index
    pageList.push(
        <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
    )
刚开始时，list为空数组，则newList也为空数组，只有当ajax获取到数据后，list内容才存在
    //当发送ajax后，list内有数据，才进行循环
    if(newList.length){
        //page为1，从0开始~9，page为2，从10开始~19
        for(let i=(page-1)*10;i<page*10;i++){
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            )
        }
    }
------reducer连续使用set（优化）
使用merge()
    merge可以同时改变多个内容，相当于多次调用set，而调用一次则创建一个immutable对象
        case constants.CHANGE_LIST:
            return state.merge({
                list:action.data,
                totalPage:action.totalPage
            })
----------换一换图标
1.由于之前把放大镜的图标设置为绝对定位，此时换一换图标也处于右下角位置，将放大镜图标className加一个zoom
2.style.js中将SearchWrapper下的.iconfont改为.zoom
3.给换一换图标加一个classname为 spin，找到SearchInfoSwitch写spin的样式
    .spin{
        display: block;//只有block才可以进行translate
        font-size: 12px;
        margin-right: 2px;
        transition: all .2s ease-in;//ease-in 指定一个慢启动的过渡效果
        
        transform-origin: center center;//旋转中心
    }
4.当点击换一换时，rotate的值发生变化，点击事件多加一个参数为spin
    给图标加一个ref
        <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,spin)}>
            <span ref={(icon)=>{this.spinIcon=icon}} className="iconfont spin">&#xe852;</span>
            换一批
        </SearchInfoSwitch>
5.每次点击时改变rotate的值 transform: rotate(0deg);//rotate刚开始为0°
        <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
            {/* ref可以获取到真实的DOM节点 将此节点icon传递给this.spinIcon*/}
            <span ref={(icon)=>{this.spinIcon=icon}} className="iconfont spin">&#xe852;</span>
            换一批
        </SearchInfoSwitch>  
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
            spin.style.transform='rotate('+(originAngle+360)+'deg)';
        }
---------------避免不必要的ajax请求
每当点击搜索框时，都会获取ajax请求
    1.给handleInputFocus的时候传递一个参数list
        <NavSearch className={focused ? 'focused' : ''}
            onFocus={()=>{handleInputFocus(list)}}
            onBlur={handleInputBlur}>
        </NavSearch>
    2.handleInputFocus(list){
            //当列表长度=0才发送ajax请求
            if(list.size===0){
                dispatch(actionCreators.getList());
            }
            dispatch(actionCreators.searchFocus()); 
    }