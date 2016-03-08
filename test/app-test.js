import React  from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon/pkg/sinon';
import sinonChai from 'sinon-chai';

import { App } from '../js/components/App';

const expect = chai.expect;
chai.use(sinonChai);

const mockData = {
  actions: {
    changeArticlesType() {

    }
  },
  clientData: {
    articles: {
      type: 'all'
    }
  },
  serverData: {
    articlePreviews: {
      edges: [
        {
          node: {
            id: 'xyz',
            articleId: '1',
            type: 'tech',
            preview: 'https://google.com/favicon.ico',
            title: 'Lorem ipsum'
          }
        },
        {
          node: {
            id: 'abc',
            articleId: '2',
            type: 'politics',
            preview: 'https://facebook.com/favicon.ico',
            title: 'muspi meroL'
          }
        },
        {
          node: {
            id: 'fff',
            articleId: '3',
            type: 'tech',
            preview: 'https://apple.com/favicon.ico',
            title: 'Xyxyxyxy'
          }
        }
      ]
    }
  }
};

describe('app component', function () {
  let testData;

  beforeEach(() => {
    testData = { ...mockData };
  });

  it('should renders right', () => {
    const app = TestUtils.renderIntoDocument(<App {...testData} />);
    expect(app).to.exist;

    const articlesContainer = TestUtils.findRenderedDOMComponentWithClass(app, 'articles');
    const typeSelect = TestUtils.findRenderedDOMComponentWithTag(app, 'select');
    const articlePreviews = TestUtils.scryRenderedDOMComponentsWithClass(app, 'article-preview');

    expect(articlePreviews.length).to.be.equal(3);
  });

  it('should has right number of options in articleType select', () => {
    const app = TestUtils.renderIntoDocument(<App {...testData} />);
    const selectOptions = TestUtils.scryRenderedDOMComponentsWithTag(app, 'option');

    // 2 unique types + 'all' type
    expect(selectOptions.length).to.be.equal(3);
  });

  it('should filter articles by type', () => {
    testData.clientData.articles.type = 'tech';

    const app = TestUtils.renderIntoDocument(<App {...testData} />);
    const articlePreviews = TestUtils.scryRenderedDOMComponentsWithClass(app, 'article-preview');

    expect(articlePreviews.length).to.be.equal(2);
  });

  it('should call action on select change', () => {
    const actionSpy = sinon.spy(testData.actions, 'changeArticlesType');

    const app = TestUtils.renderIntoDocument(<App {...testData} />);
    const selectNode = app.refs.articlesTypeSelect;

    selectNode.value = 'tech';

    TestUtils.Simulate.change(selectNode);

    expect(actionSpy).to.have.been.calledWith('tech');
  });
});
