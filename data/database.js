import articles from './articles.json';

export class App { }

var app = new App();
app.id = 1;

class Article {
  constructor(source) {
    this._id = source.id;
    this._title = source.title;
    this._type = source.type;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get type() {
    return this._type;
  }
}

export class PreviewArticle extends Article {
  constructor(source) {
    super(source);
    this._preview = source.preview;
  }

  get preview() {
    return this._preview;
  }
}

export class FullArticle extends Article {
  constructor(source) {
    super(source);
    this._image = source.image;
    this._content = source.content;
  }

  get image() {
    return this._image;
  }

  get content() {
    return this._content;
  }
}

export function getApp(id) {
  return app;//id === app.id ? app : null;
}

export function getArticlePreviews() {
  return articles.map(article => new PreviewArticle(article));
}

export function getArticlePreview(id) {
  return new PreviewArticle(articles.find(article => article.id === id));
}

export function getFullArticle(id) {
  return new FullArticle(articles.find(article => article.id === id));
}
