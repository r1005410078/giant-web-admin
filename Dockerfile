FROM node:8.11.3-slim
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  pm install -g @angular/cli \
RUN  npm install \
    && ng build  \
    && cp -r dist/* /var/www/html \
    && rm -rf /app
CMD ["nginx","-g","daemon off;"]