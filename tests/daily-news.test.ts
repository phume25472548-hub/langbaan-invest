import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseFedFeed} from '../lib/daily-news';
const action='<item><title>Federal Reserve Board announces enforcement action against American Express Company</title><link>https://www.federalreserve.gov/newsevents/pressreleases/enforcement20261008a.htm</link><description>Federal Reserve Board announces enforcement action against American Express Company</description><category>Enforcement Actions</category><pubDate>Thu, 8 Oct 2026 20:30:00 GMT</pubDate></item>';
const monetary='<item><title>Minutes of the Federal Open Market Committee</title><link>https://www.federalreserve.gov/newsevents/pressreleases/monetary20261007a.htm</link><description>Minutes of the Federal Open Market Committee</description><category>Monetary Policy</category><pubDate>Wed, 7 Oct 2026 18:00:00 GMT</pubDate></item>';
const feed=(items:string)=>`<rss version="2.0"><channel>${items}</channel></rss>`;
test('Fed RSS preserves original titles, sorts dates and distinguishes direct company mentions',()=>{
 const articles=parseFedFeed(feed(monetary+action));assert.equal(articles.length,2);assert.equal(articles[0].published,'2026-10-08T20:30:00.000Z');assert.deepEqual(articles[0].mentionedSymbols,['AXP']);assert.equal(articles[0].topic,'FED_BANKING');assert.equal(articles[1].topic,'FED_MONETARY');assert.deepEqual(articles[1].mentionedSymbols,[]);assert.equal(articles[0].title,articles[0].content);
});
test('RSS accepts a single item',()=>{assert.equal(parseFedFeed(feed(action)).length,1)});
test('RSS rejects untrusted article URLs and invalid timestamps',()=>{
 assert.throws(()=>parseFedFeed(feed(action.replace('https://www.federalreserve.gov/','https://example.org/'))));assert.throws(()=>parseFedFeed(feed(action.replace('Thu, 8 Oct 2026 20:30:00 GMT','invalid date'))));
});
test('a malformed feed cannot produce a successful empty news result',()=>{assert.throws(()=>parseFedFeed('<rss><channel/></rss>'))});
