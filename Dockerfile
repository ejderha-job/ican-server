FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
CMD ["npm","run","start:dev"]