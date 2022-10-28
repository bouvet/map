FROM node:16-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

COPY .env.production.local .

RUN npm run build

FROM nginx:stable-alpine

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]