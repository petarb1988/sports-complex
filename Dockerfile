FROM node

WORKDIR /sports-complex

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
