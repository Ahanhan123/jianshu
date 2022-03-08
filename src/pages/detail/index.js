import React, {Component} from 'react';
import {connect} from "react-redux";
import './style'
import {Content, DetailWrapper, Header} from "./style";
import {actionCreators} from "./store";
class Detail extends Component {
    render() {
        console.log(this.props)
        const {title,content}=this.props
        return (
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{__html:content}}/>
            </DetailWrapper>
        );
    }
    componentDidMount() {
        this.props.getDetail();
    }
}

const mapStateToProps=(state)=>({
    title:state.getIn(['detail','title']),
    content:state.getIn(['detail','content'])
})
const mapDispatchToProps=(dispatch)=>({
    getDetail(){
        dispatch(actionCreators.getDetail())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Detail);