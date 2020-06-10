FROM registry.jianke.com/library/node:8

COPY dist/ /var/www/dist/
COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock
COPY .npmrc /var/www/.npmrc

WORKDIR /var/www
ENV NODE_ENV production
RUN yarn --production

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
