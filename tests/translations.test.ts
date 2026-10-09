import {test} from 'node:test';
import assert from 'node:assert/strict';
import snapshot from '../data/bls-snapshot.json';
import {getTranslation} from '../lib/translations';
const numbers=(text:string)=>(text.match(/\d[\d,]*(?:\.\d+)?/g)||[]).sort();
test('all existing releases have Thai translations with the original numeric values',()=>{
 assert.equal(snapshot.articles.length,36);
 for(const article of snapshot.articles){const translated=getTranslation(article);assert.ok(translated,article.id);assert.match(translated.title,/[ก-๙]/);assert.match(translated.content,/[ก-๙]/);assert.deepEqual(numbers(translated.title),numbers(article.title),article.id+' title');assert.deepEqual(numbers(translated.content),numbers(article.content),article.id+' content')}
});
test('revised source text does not reuse an outdated translation',()=>{
 const article=snapshot.articles[0];assert.equal(getTranslation({...article,content:article.content.replace('29,000','30,000')}),undefined);assert.equal(getTranslation({...article,title:article.title+' (revised)'}),undefined);
});
test('new releases remain untranslated rather than receiving a guessed translation',()=>{
 assert.equal(getTranslation({...snapshot.articles[0],id:'new-release'}),undefined);
});
test('formatting changes alone preserve matching translations',()=>{
 const article=snapshot.articles[0];assert.ok(getTranslation({...article,title:' '+article.title+' ',content:article.content.replace(/ /g,'\n')}));
});
