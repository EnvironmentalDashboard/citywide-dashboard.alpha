FROM node:8
ARG WEBPACK="npm run build-prod"
ENV WEBPACK=${WEBPACK}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ${WEBPACK} && npm start