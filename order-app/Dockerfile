FROM node:10

ENV ORDER_APP_PORT=3000
ENV MONGO_URL='mongodb+srv://setel:wUmsxZZvwiQ427M@cluster0-zvnvq.mongodb.net/orders-dev?retryWrites=true&w=majority'

RUN mkdir -p /usr/src/order-app
ADD . /usr/src/order-app

WORKDIR /usr/src/order-app
RUN npm install

EXPOSE $ORDER_APP_PORT
CMD [ "npm", "start" ]

