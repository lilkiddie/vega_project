FROM node:18

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y

COPY ./ ./app/client

WORKDIR ./app/client

RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 3000
