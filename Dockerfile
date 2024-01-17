FROM node:14-alpine AS development

# define variables and defaults will be passed in from team city
ARG buildConfig=Release
ARG buildNumber=1.0.0
ARG buildEnvironment=production

# for caching optimisations
COPY package*.json /
RUN npm install

# required to serve the react app on the live server
RUN npm install -g serve

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN ls -AlF

ENV BUILD_CONFIG $buildConfig
ENV BUILD_NUMBER $buildNumber
ENV BUILD_ENVIRONMENT $buildEnvironment
ENV NODE_ENV=$buildEnvironment
ENV PORT=3000

CMD [ "npm", "run", "start" ]

EXPOSE 3000