import {createClient} from 'redis/dist';
// import Redis from 'ioredis';

// - REDIS_HOST=redis-stack
// - REDIS_PORT=6379
// - REDIS_USER=tyrant_token
// - REDIS_PASS=tyrant_redis_pass
// export const redisClient = async () => {
// const redisHost = 'redis-stack.dappd.net';
// const redisPort = 6379;
// const redisUser = 'apollo_token';
// const redisPass = 'apollo_redis_pass';

const redisHost = process.env.REDIS_HOST || 'redis-stack.com.net';
const redisPort = process.env.REDIS_PORT || 6379;
const redisUser = process.env.REDIS_USER || 'apollo_token';
const redisPass = process.env.REDIS_PASS || 'apollo_redis_pass';

const client = createClient({
  url: `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`,
  // url: `redis://tyrant_token:tyrant_redis_pass@${redisHost}:6379`,
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();
// return client;

export default client;
// export redisClient;
