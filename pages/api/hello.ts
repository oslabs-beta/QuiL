export default function handler(req: any, res: any) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      
      res.status(200).json({ message: `You submitted the following data: ` });

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!' });
  }
}
