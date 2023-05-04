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
      repo: 'git@github.com:Danila4191/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local ': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && npm pm2 reload ecosystem.config.js && npm pm2 save',
    },
  },
}
