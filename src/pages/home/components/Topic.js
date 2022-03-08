import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {TopicWrapper,TopicItem} from '../style'

class Topic extends PureComponent {
    render() {
        const {list}=this.props;
        return (
            <TopicWrapper>
                {
                    list.map((item)=>{
                        return (
                            <TopicItem key={item.get('id')}>
                                {/*每个item是从topicList里拿来的，每个都是一个对象，经formJS，变为了immutable对象，所以要用get获取*/}
                                <img className="top-pic"
                                     src={item.get('imgUrl')} alt=""/>
                                {item.get('title')}
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        );
    }
}

//从store中拿数据
const mapStateProps=(state)=>({
    //拿home里的topList 赋值到this.props.list里
    list:state.get('home').get('topicList')
})
/*
//修改数据
const mapDispatch=()=>{

}
*/

export default connect(mapStateProps,null)(Topic);