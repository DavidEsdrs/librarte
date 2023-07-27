FROM nginx:alpine

WORKDIR /etc/nginx
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]