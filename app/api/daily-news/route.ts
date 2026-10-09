import {getDailyNews} from '../../../lib/daily-news';
export async function GET(){return Response.json(await getDailyNews(),{headers:{'Cache-Control':'public, s-maxage=60'}})}
