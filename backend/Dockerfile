FROM node:18-alpine
WORKDIR /backend_oj
COPY package*.json ./
RUN npm install
RUN apk add --no-cache python3 g++ make
COPY . .
EXPOSE 8070
CMD ["npm", "run", "dev"]