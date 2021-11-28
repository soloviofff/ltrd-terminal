FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node_modules/ts-node-dev/lib/bin.js", "--respawn", "index.ts"]
