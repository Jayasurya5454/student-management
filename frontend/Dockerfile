FROM node:18 AS build
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build
FROM ngnix:stable-alpine
COPY --from build /app/dist /usr/share/html
CMD ["nginx", "-g", "daemon off;"]
