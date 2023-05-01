require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;
  module.exports = {
    apps : [{
      name   : "api-mesto",
      script : "./dist/app.js"
    }],
    deploy: {
      production: {
        user: DEPLOY_USER,
        host: DEPLOY_HOST,
        ref: DEPLOY_REF,
        repo: 'https://github.com/Danila4191/web-plus-pm2-deploy',
        path: DEPLOY_PATH,
        'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
        'post-deploy': 'cd frontend && npm i && npm run build',
      },
    },
  }
