FROM node:20-alpine

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install --production

COPY dist ./dist
EXPOSE 3000:3000

# Variables no sensibles
ENV PORT=3000
ENV DB_NAME=admin
ENV DB_USER=postgres
ENV DB_PORT=5432

# No fijes DB_PASS ni DB_HOST aquí
CMD ["node","./dist/src/index.js"]