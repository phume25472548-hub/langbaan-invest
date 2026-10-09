import translations from '../data/bls-th.json';
export type Translation={title:string;content:string;translatedAt:string;translator:string};
type SourceArticle={id:string;title:string;content:string};
const normalize=(text:string)=>text.replace(/\s+/g,' ').trim();
export function getTranslation(article:SourceArticle):Translation|undefined {
 const saved=(translations as Record<string,Translation & {sourceTitle:string;sourceContent:string}>)[article.id];
 // BLS may revise a release without changing its id. Never display an outdated translation.
 if(!saved||normalize(saved.sourceTitle)!==normalize(article.title)||normalize(saved.sourceContent)!==normalize(article.content))return undefined;
 return {title:saved.title,content:saved.content,translatedAt:saved.translatedAt,translator:saved.translator};
}
