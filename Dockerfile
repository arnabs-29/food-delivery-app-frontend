#Stage 1: Build the angular app
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Stage 2: Serve the app with nginx server
FROM nginx:1.21.0-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/food-delivery-app/* /usr/share/nginx/html/
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
