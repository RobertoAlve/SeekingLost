FROM openjdk:22.0.1-jre-alpine

WORKDIR /app

COPY seekinglost.jar /app

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "seekinglost.jar"]

#docker build -t seekinglost-api .
#docker run -p 8080:8080 seekinglost-api