FROM node:14

RUN mkdir -p /home/app

COPY . /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

EXPOSE 8080
# no need for /home/app/server.js because of WORKDIR
CMD ["node", "app.js"]