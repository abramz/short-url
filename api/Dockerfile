# Base image
FROM iojs:onbuild

# File Author
MAINTAINER Andrew Shapro

# Install pm2 for control the process
RUN npm install -g pm2

EXPOSE 3000

# run the app with pm2
CMD [ "pm2", "start", "./bin/www", "--no-daemon" ]
