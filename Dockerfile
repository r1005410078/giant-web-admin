FROM node:8.11.3-slim
RUN yum install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN npm install -g @angular/cli \
    && npm install \
    && ng build  \
    && cp -r dist/* /var/www/html \
    && rm -rf /app
CMD ["nginx","-g","daemon off;"]