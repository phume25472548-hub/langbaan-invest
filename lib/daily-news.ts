import {XMLParser} from 'fast-xml-parser';
import {fetch as networkFetch,EnvHttpProxyAgent} from 'undici';
import {unstable_cache} from 'next/cache';
import snapshot from '../data/fed-snapshot.json';
import type {Article} from './news';
export type DailyArticle=Article & {mentionedSymbols:string[]};
const agent=new EnvHttpProxyAgent();
const parser=new XMLParser({ignoreAttributes:false,processEntities:true});
const text=(value:unknown):string=>typeof value==='string'?value:'';
export function parseFedFeed(xml:string):DailyArticle[]{
 const items=parser.parse(xml)?.rss?.channel?.item;if(!items)throw Error('Invalid Fed RSS');
 return (Array.isArray(items)?items:[items]).map((item:Record<string,unknown>)=>{
  const url=text(item.link);const title=text(item.title);const content=text(item.description);const date=Date.parse(text(item.pubDate));const category=text(item.category);
  if(!/^https:\/\/www\.federalreserve\.gov\/newsevents\/pressreleases\/[a-z0-9]+\.htm$/.test(url)||!title||!content||!Number.isFinite(date))throw Error('Invalid Fed release');
  const topic=category==='Monetary Policy'?'FED_MONETARY':/Enforcement Actions|Orders on Banking Applications|Banking and Consumer Regulatory Policy|Banking Applications/.test(category)?'FED_BANKING':'FED_OTHER';
  return {id:'fed-'+url.split('/').at(-1)!.replace(/\.htm$/,''),title,content,published:new Date(date).toISOString(),url,topic,source:'Board of Governors of the Federal Reserve System',mentionedSymbols:title.includes('American Express Company')?['AXP']:[]};
 }).sort((a:DailyArticle,b:DailyArticle)=>Date.parse(b.published)-Date.parse(a.published));
}
export const getDailyNews=unstable_cache(async()=>{
 try{const r=await networkFetch('https://www.federalreserve.gov/feeds/press_all.xml',{dispatcher:agent,signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('Feed unavailable');const xml=await r.text();if(xml.length>1000000)throw Error('Feed too large');return {articles:parseFedFeed(xml),retrievedAt:new Date().toISOString(),fallback:false,snapshotAt:snapshot.retrievedAt}}
 catch{return {articles:snapshot.articles as DailyArticle[],retrievedAt:new Date().toISOString(),fallback:true,snapshotAt:snapshot.retrievedAt}}
},['fed-daily-v1'],{revalidate:900});
