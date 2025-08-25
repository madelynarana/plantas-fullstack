FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Para desarrollo con hot-reload
EXPOSE 5173
CMD ["npm", "run", "dev"]
