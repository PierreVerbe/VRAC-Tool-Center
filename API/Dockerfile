# Pull official base image
FROM java:8-jdk-alpine

# Set working directory
WORKDIR /usr/app

# Copy jar file to run
COPY target/rest-service-*.jar /usr/app/rest-service.jar

# Start service
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "rest-service.jar"]
