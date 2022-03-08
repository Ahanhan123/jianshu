import React, {Component} from 'react';
import './App.css';
import {Provider} from "react-redux";
import {Routes} from 'react-router';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./common/Header";
import store from './store/index'
import Home from "./pages/home";
import Detail from "./pages/detail";


class App extends Component {
    render() {
        return (
            //redux里有一个核心组件叫Provider，它里的所有组件都有能力去使用store里的数据
            //也可以说为Provider组件将store里的数据都提供给了内部组件
            <Provider store={store}>
                    {/*<BrowserRouter> 代表路由 Route代表路由规则*/}
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            {/*添加exact：当访问根路径时，只显示home 当访问detail只显示detail*/}
                            <Route path='/' element={<Home/>}/>
                            <Route path='/detail/:id' element={<Detail/>}/>
                        </Routes>
                    </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
