FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=5173
ENV VITE_BACKEND_URL=http://localhost:3000

EXPOSE 5173

CMD ["npm", "run", "dev"]
