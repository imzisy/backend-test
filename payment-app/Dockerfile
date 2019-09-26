FROM node:10

ARG PAYMENT_APP_PORT=3000
RUN mkdir -p /usr/src/payment-app
ADD . /usr/src/payment-app

WORKDIR /usr/src/payment-app
RUN npm install
EXPOSE $PAYMENT_APP_PORT
CMD [ "npm", "start" ]
