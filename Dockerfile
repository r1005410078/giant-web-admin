FROM node:8.11.3-slim
RUN apt-get update \
    && apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN npm install -g @angular/cli \
    && npm install \
    && ng build --prod \
    && cp -r dist/web-admin/* /var/www/html \
    && rm -rf /app
CMD ["nginx","-g","daemon off;"]
