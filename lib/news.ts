import {XMLParser} from 'fast-xml-parser';
import {fetch as networkFetch, EnvHttpProxyAgent} from 'undici';
import {unstable_cache} from 'next/cache';
import snapshot from '../data/bls-snapshot.json';
import {getTranslation,type Translation} from './translations';
export type Article={id:string;title:string;content:string;published:string;url:string;topic:string;source:string;translation?:Translation};
export const topics:Record<string,string>={CPI:'เงินเฟ้อผู้บริโภค (CPI)',EMPLOYMENT:'การจ้างงานสหรัฐฯ',PPI:'ราคาผู้ผลิต (PPI)'};
const feeds=[{topic:'CPI',url:'https://www.bls.gov/feed/cpi.rss'},{topic:'EMPLOYMENT',url:'https://www.bls.gov/feed/empsit.rss'},{topic:'PPI',url:'https://www.bls.gov/feed/ppi.rss'}];
const parser=new XMLParser({ignoreAttributes:false,processEntities:true});
const agent=new EnvHttpProxyAgent();
function plain(value:unknown):string {return typeof value==='string'?value:typeof value==='number'?String(value):''}
export function parseFeed(xml:string,topic:string):Article[]{
 const feed=parser.parse(xml)?.feed;if(!feed?.entry)throw new Error('Missing Atom entries');
 const entries=Array.isArray(feed.entry)?feed.entry:[feed.entry];
 return entries.map((e:Record<string,unknown>)=>{const link=Array.isArray(e.link)?e.link.find((l:Record<string,string>)=>!l['@_rel']||l['@_rel']==='alternate'):e.link;const url=plain((link as Record<string,unknown>)?.['@_href']);const a={id:plain(e.id),title:plain(e.title),content:plain(e.content),published:plain(e.published),url,topic,source:'U.S. Bureau of Labor Statistics'};if(!a.id||!a.title||!a.content||!Number.isFinite(Date.parse(a.published))||!/^https:\/\/www\.bls\.gov\/news\.release\//.test(url))throw new Error('Invalid article');return a;});
}
export const getNews=unstable_cache(async()=>{
 const outcomes=await Promise.all(feeds.map(async feed=>{try{const response=await networkFetch(feed.url,{dispatcher:agent,signal:AbortSignal.timeout(12000)});if(!response.ok)throw new Error('Feed unavailable');const xml=await response.text();if(xml.length>1000000)throw new Error('Feed too large');return {articles:parseFeed(xml,feed.topic),fallback:false,topic:feed.topic}}catch{return {articles:snapshot.articles.filter(a=>a.topic===feed.topic),fallback:true,topic:feed.topic}}}));
 const articles=outcomes.flatMap(r=>r.articles).sort((a,b)=>Date.parse(b.published)-Date.parse(a.published));
 return {articles:articles.map(a=>({...a,translation:getTranslation(a)})),retrievedAt:new Date().toISOString(),fallbackTopics:outcomes.filter(r=>r.fallback).map(r=>r.topic),snapshotAt:snapshot.retrievedAt};
},['bls-news-v2-th'],{revalidate:3600});
export async function getArticle(id:string){const news=await getNews();const article=news.articles.find(a=>a.id===id)||snapshot.articles.find(a=>a.id===id);return article?{...article,translation:getTranslation(article)}:undefined}
export function formatDate(value:string){return new Intl.DateTimeFormat('th-TH',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Shanghai'}).format(new Date(value))}
