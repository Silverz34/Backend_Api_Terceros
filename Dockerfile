
FROM node:20-alpine

WORKDIR /src


COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src/ ./src/

RUN npm run dev

EXPOSE 4000

CMD ["npm", "start"]