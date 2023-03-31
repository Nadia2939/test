import {Timestamp} from '@redis/time-series/dist/commands';
import {NextApiRequest, NextApiResponse} from 'next';

import client from '@/typescript/redisClient';
import {TimeSeriesAggregationType} from 'redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {start, end, bucketduration} = req.query;
    const query = {
      start: (start as Timestamp) || '-',
      end: (end as Timestamp) || '+',
      bucketduration: Number(bucketduration) || 3600000,
    };
    try {
      client.ts
        .RANGE('apollo_token_data:usd_value', query.start, query.end, {
          AGGREGATION: {
            type: TimeSeriesAggregationType.AVG,
            timeBucket: query.bucketduration,
          },
        })
        .then(result => {
          res.status(200).json(result);
        })
        .catch(error => {
          console.log('error', error);
          res.status(500).json({error: 'failed to fetch data'});
        });
    } catch (error) {
      res.status(500).json({error: 'failed to fetch data'});
    }
  } else res.status(405).json({error: 'Method not allowed'});
}
