FROM azul/zulu-openjdk:22.0.1-jdk

WORKDIR /app

ENV SPRING_DATASOURCE_URL=jdbc:mysql://ec2-44-211-99-73.compute-1.amazonaws.com:3306/seekinglost
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=urubu100

ENV AWS_ACCESS_KEY=$AWS_ACCESS_KEY_L
ENV AWS_SECRET_KEY=$AWS_SECRET_KEY_L
ENV AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN_L

COPY ./target/seekinglostapi-0.0.1-SNAPSHOT.jar /app/seekinglost.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "seekinglost.jar"]
