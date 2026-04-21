FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 10000
ENTRYPOINT ["java", \
  "-Dspring.data.mongodb.uri=mongodb+srv://srushtikansara06_db_user:Cravelt2024@m0-free-cluster.cyug4zj.mongodb.net/cravelt?retryWrites=true&w=majority&appName=M0-FREE-Cluster", \
  "-Dserver.port=10000", \
  "-jar", "app.jar"]