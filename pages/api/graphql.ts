import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const uri =
  'http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log('here');

  const { data } = await axios.post(uri, request.body);

  response.status(200).json(data);
}
