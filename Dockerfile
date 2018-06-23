FROM node:6.10.3-slim
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \
    && ng build  \
    && cp -r dist/* /var/www/html \
    && rm -rf /app
CMD ["nginx","-g","daemon off;"]