FROM node:current-buster-slim
RUN apt-get update -y

COPY . .
RUN npm install -g
