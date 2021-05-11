# Multistage Build Step 1: Build app
FROM node:alpine as build

WORKDIR /app

ARG NPM_TOKEN
ARG NPM_USER

ENV NPM_TOKEN=${NPM_TOKEN}
ENV NPM_USER=${NPM_USER}

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json .npmrc ./
RUN npm install
COPY . .
RUN npm run build

# Multistage Build Step 2: Package up assets into nginx image
FROM nginx:alpine

RUN apk add --update --no-cache bash

COPY --from=build /app/build /usr/share/nginx/html/myapp
COPY packaging/nginx/app.conf /etc/nginx/conf.d/app.conf

CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]

# You should now be able to run this image as follows:
# docker run --rm  -p 80:80  react_nginx
# Then go to http://127.0.0.1:80