import {NextApiRequest, NextApiResponse} from 'next';

import client from '@/typescript/redisClient';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {timestamp, apollo} = req.body;
    if (!timestamp || !apollo) {
      res.status(400).json({error: 'Invalid request body'});
      return;
    }
    try {
      client.ts
        .ADD('apollo_token_data:usd_value', timestamp, apollo)
        .then(result => {
          res.status(200).json({success: true});
        })
        .catch(error => {
          console.log('error', error);
          res.status(500).json({error: 'failed to post data'});
        });
    } catch (error) {
      res.status(500).json({error: 'failed to post data'});
    }
  } else res.status(405).json({error: 'Method not allowed'});
}
