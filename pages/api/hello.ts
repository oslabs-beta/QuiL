import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const uri =
  'http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { data } = await axios.post(uri, request.body);
  console.log('DATA ', data);

  response.status(200).json({
    data,
  });
}
