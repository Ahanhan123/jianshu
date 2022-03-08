import styled from "styled-components";
import logoPic from '../../statics/logo.png'

//创建一个HeaderWrapper组件，此组件相当于一个div标签，它带有样式，并把它暴露出去
export const HeaderWrapper=styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
`;

/*组件加属性 attrs内传入对象*/
export const Logo=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width:100px ;
  height: 56px;
  background: url(${logoPic});
  background-size: contain;
`;

export const Nav=styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  padding-right: 70px;
  box-sizing: border-box;
`;

/*左浮动和右浮动 一起写*/
export const NavItem=styled.div`
  line-height: 56px;
  font-size: 17px;
  padding:0 15px;
  color: #333;
    &.left{
      float:left;
    }
    &.right{
      float: right;
      color: #969696;
    }
    &.active{
    color: #ea6f5a;
  }
`;

/*搜索框*/
export const SearchWrapper=styled.div`
  position: relative;
  float: left;
  .zoom{
    position:absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
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
  margin-top: 9px;
  margin-left: 20px;
  padding: 0 33px 0 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background:#eee;
  font-size: 14px;
  color: #666;
  &.slide-enter{//第一个时刻
    transition: all .2s ease-out;//ease-out动画效果
  }
  &.slide-enter-active{//动画执行完
    width: 240px;
  }
  //移出
  &.slide-exit{//第一个时刻
    transition: all .2s ease-out;//ease-out动画效果
  }
  &.slide-exit-active{//动画执行完
    width: 160px;
  }
  &::placeholder{
    color: #999;
  }
  &.focused{
    width:240px ;
  }
`;

/*searchInfo 点击搜索框输入后下边的提示部分*/
export const SearchInfo=styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  width: 240px;
  padding: 0 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.2);
  background: #fff;
`
export const SearchInfoTitle=styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`
export const SearchInfoSwitch=styled.span`
  float: right;
 /* margin-right: 1px;*/
  font-size: 13px;
  cursor:pointer;
  .spin{
    display: block;//只有block才可以进行translate
    float:left;
    font-size: 12px;
    margin-right: 2px;
    transition: all .2s ease-in;//ease-in 指定一个慢启动的过渡效果
    /*transform: rotate(0deg);//rotate刚开始为0°*/
    transform-origin: center center;//旋转中心
  }
`
export const SearchInfoList=styled.div`
    overflow: hidden;
`
export const SearchInfoItem=styled.a`
  display: block;
  float: left;
  line-height: 20px;
  padding: 0 20px;
  margin-right:10px;
  margin-bottom: 10px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #787878;
  border-radius: 3px;
`

/*额外部分*/
export const Addition=styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 56px;
`
export const Button=styled.div`
  float: right;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 4px;
  &.reg{
    color: #ec6149;
  }
  &.writing{
    color: white;
    background: #ec6149;
  }
`
