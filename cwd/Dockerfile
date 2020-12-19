FROM node:8
WORKDIR /usr/src/app
ARG APP_ENV
ENV APP_ENV=${APP_ENV}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
RUN npm run build-$APP_ENV
CMD if [ "$APP_ENV" = "prod" ]; then \
  npm start; \
  else \
  npm run watch-build & npm run start-dev; \
  fi
