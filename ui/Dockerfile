# Pull official base image
FROM node:14.17.4-alpine

# Set working directory
WORKDIR /usr/app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# Add app
COPY . ./

# Start app
CMD ["npm", "start"]
