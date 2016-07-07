# Set the base image to centos
FROM nginx:1.9

# File Author
MAINTAINER Andrew Shapro

# get ep
RUN apt-get update && apt-get install -y curl
RUN curl -sLo /usr/local/bin/ep https://github.com/kreuzwerker/envplate/releases/download/v0.0.8/ep-linux && chmod +x /usr/local/bin/ep

# make cache dirs
RUN mkdir --parents /tmp/cache/gcs \
	&& mkdir --parents /tmp/cache/api \
	&& mkdir --parents /tmp/cache/temp

# Add nginx configs
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/mime.types /etc/nginx/mime.types

# Copy error page
COPY pages/error.html /usr/share/nginx/html/error.html

# Run nginx
CMD [ "/usr/local/bin/ep", "-v", "/etc/nginx/nginx.conf", "--", "/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;" ]
