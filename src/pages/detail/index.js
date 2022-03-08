import React, {Component} from 'react';
import {connect} from "react-redux";
import './style'
import {Content, DetailWrapper, Header} from "./style";
import {actionCreators} from "./store";
import PropTypes from 'prop-types'
class Detail extends Component {
    render() {
        console.log(this.props.history)
        /*const {title,content}=this.props*/
        return (
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                <Content dangerouslySetInnerHTML={{__html:this.props.content}}/>
            </DetailWrapper>
        );
    }
    componentDidMount() {
        this.props.getDetail();
    }
}

/*Detail.propTypes = {
    router: PropTypes.object.isRequired
}*/


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