require('dotenv').config();

const Twit = require('twit');

const T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
});

// tweet the article
const articleTitle = 'Angry Bob Article';
const articleUrl = 'https://www.your-article-url.com';
const tweetText = `Hey, buddy. This is Bob for chatting humor.: ${articleTitle} ${articleUrl}`;
T.post('statuses/update', { status: tweetText })
  .then(tweet => console.log(`Tweet posted: ${tweet}`))
  .catch(error => console.error(`Error posting tweet: ${error}`));

const stream = T.stream('statuses/filter', { track: '@your_bot_handle' });

stream.on('tweet', (tweet) => {
    const reply = `@${tweet.user.screen_name} Haha, nice one! Your tweet was so funny, I almost forgot I'm just a robot 🤖😂`;
    
    T.post('statuses/update', { status: reply, in_reply_to_status_id: tweet.id_str }, (err, data, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Replied to tweet ${tweet.id_str} with "${reply}"`);
        }
    });
});
  