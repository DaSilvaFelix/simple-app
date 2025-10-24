FROM node:20-alpine

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install --production

COPY dist ./dist
COPY wait-for-postgres.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-postgres.sh

ENV PORT=3000
ENV MY_SECRET_KEY=claveSecretaDelPoryectoSimpleApp
ENV DB_NAME=admin
ENV DB_USER=postgres
ENV DB_PASS=admin
ENV DB_HOST=postgres
ENV DB_PORT=5432

CMD ["/usr/local/bin/wait-for-postgres.sh", "postgres", "5432", "node", "dist/src/index.js"]