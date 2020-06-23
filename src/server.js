import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    cookieParser(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        code: req.cookies.code || 'US',
        country: req.cookies.country || 'US',
        view: req.cookies.view 
      }),
    })
  )
  .use(cookieParser())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
