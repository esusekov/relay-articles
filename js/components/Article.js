import React from 'react';
import Relay from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './../redux/actions';

class Article extends React.Component {

  render() {
    const { serverData: article, clientData } = this.props;
    const { title, image, content } = article;

    return (
      <div className="full-article">
        <h1>{title}</h1>
        <img src={image} />
        <span>{content}</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientData: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Relay.createContainer(Article, {
  fragments: {
    serverData: () => Relay.QL`
      fragment on FullArticle {
        id,
        title,
        image,
        content
      }
    `,
  },
}));
