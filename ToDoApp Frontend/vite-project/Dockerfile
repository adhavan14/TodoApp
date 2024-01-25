FROM node:alpine AS development

WORKDIR /react-app

COPY ./package*.json /react-app/

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn","run", "dev"]