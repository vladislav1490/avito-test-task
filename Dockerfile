FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app /app

RUN npm install -g json-server

EXPOSE 3000 5173

CMD ["sh", "-c", "npm run start:json-server & npm run dev"]

