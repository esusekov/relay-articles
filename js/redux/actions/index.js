export const CHANGE_ARTICLES_TYPE = 'CHANGE_ARTICLES_TYPE';

export function changeArticlesType(articlesType) {
  return { type: CHANGE_ARTICLES_TYPE, articlesType };
}
