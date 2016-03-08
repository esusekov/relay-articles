import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './../redux/actions';

export class App extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    serverData: PropTypes.object.isRequired,
    clientData: PropTypes.object.isRequired,
  };

  onArticlesTypeChange = () => {
    const type = this.refs.articlesTypeSelect.value;

    this.props.actions.changeArticlesType(type);
  };

  render() {
    const { serverData, clientData } = this.props;
    const { edges: previews } = serverData.articlePreviews;

    const types = [...new Set(previews.map(preview => preview.node.type))];
    const type = clientData.articles.type;

    const filteredPreviews = type === 'all' ?
      previews :
      previews.filter(preview => preview.node.type === type);

    return (
      <div className="articles">

        <select
          ref="articlesTypeSelect"
          defaultValue={type}
          onChange={this.onArticlesTypeChange}
        >
          { types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
          <option value='all'>all</option>
        </select>

        {
          filteredPreviews.map(preview => {
            const { node: item } = preview;
            return (
              <Link to={`/article/${item.articleId}`}
                className="article-preview"
                key={item.id}
              >
                <img
                  className="article-preview-image"
                  src={item.preview}
                />
                <div className="article-description">
                  <span className="article-preview-title">{item.title}</span>
                  <span className="article-preview-type">{item.type}</span>
                </div>
              </Link>
            );
          })
        }

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
)(Relay.createContainer(App, {
  fragments: {
    serverData: () => Relay.QL`
      fragment on App {
        id,
        articlePreviews(first: 100) {
          edges {
            node {
              id,
              title,
              preview,
              type,
              articleId
            },
          },
        }
      }
    `,
  },
}));
