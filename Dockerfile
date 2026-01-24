FROM node:20

WORKDIR /app

# copy only dependency files first
COPY package.json package-lock.json ./

# clean, reproducible install
RUN npm ci

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
