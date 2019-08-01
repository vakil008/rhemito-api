FROM node:10 AS build
WORKDIR /srv
ADD package.json .
RUN yarn install


FROM node:10-slim
COPY --from=build /srv .

ADD . .

EXPOSE 3000 

CMD [ "yarn", "start" ]
