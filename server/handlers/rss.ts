import { RouterContext, Status } from 'https://deno.land/x/oak/mod.ts';
import config from '../config.ts';

export default async (context: RouterContext) => {
    const { params, response } = context;
    const { RSS_FEEDS } = config;
    try {
        let promises = [];
        for (let feed of RSS_FEEDS) {
            promises.push(fetch(feed.url).then(res => res.text()));
            await Promise.all(promises)
                .then(res => {
                    response.status = Status.OK;
                    response.body = res;
                });
        }
    } catch (e) {
        console.error(e);
        response.status = Status.BadRequest;
        response.body = 'Bad Request';
    }
}