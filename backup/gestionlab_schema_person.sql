-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestionlab_schema
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id_person` int NOT NULL AUTO_INCREMENT,
  `name_person` varchar(45) NOT NULL,
  `lastname_person` varchar(45) NOT NULL,
  `dni_person` varchar(45) NOT NULL,
  `email_person` varchar(45) NOT NULL,
  `number_person` varchar(45) NOT NULL,
  `address_person` varchar(45) NOT NULL,
  `birth_date_person` varchar(45) NOT NULL,
  `emergency_number` varchar(45) NOT NULL,
  `nationality_person` varchar(45) NOT NULL,
  `gender_person` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_person`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Guantanamero','Doe','1234567890','arnoglez06@email.com','0956327193','123 Main St','1990-01-01','987-654-3210','USA','Male'),(2,'Pepe','De Ali','1724857489','argonzalezzaa09473@pucesd.edu.ec','0984702911','488 Oak St','1985-05-15','123-456-7890','Canada','Female'),(3,'Bob','Johnson','4567890128','bob.johnson@email.com','0963541287','789 Elm St','1978-09-30','789-012-3456','UK','Male'),(4,'Alice','Williams','6543210987','argonzaleza@pucesd.edu.ec','0935741258','321 Pine St','1982-07-20','555-888-9999','Australia','Female'),(5,'Charlie','Brown','7890123459','charlie.brown@email.com','0963698541','987 Birch St','1995-03-10','222-333-4444','Germany','Male'),(6,'Juanito','Pérez','1785965478','juan.perez@email.com','0986357412','123 Calle Principal','1990-01-01','222-222-2222','España','Masculino'),(7,'Ana','Gómez','1569874225','ana.gomez@email.com','0956368512','456 Calle Roble','1985-05-15','333-333-3333','México','Femenino'),(8,'Pepe','Fernández','1445236885','roberto.fernandez@email.com','0936825456','789 Calle Olmo','1978-09-30','444-444-4444','Argentina','Masculino'),(9,'Alicia','Martínez','1787477459','alicia.martinez@email.com','0987125463','321 Calle Pino','1982-07-20','555-555-5555','Colombia','Femenino'),(10,'Carlos','López','1023698541','carlos.lopez@email.com','0963368471','987 Calle Abedul','1995-03-10','666-666-6666','Chile','Masculino'),(11,'Eva','Martínez','1874598745','eva.martinez@email.com','0942758632','234 Calle Cedro','1988-11-05','777-777-7777','España','Femenino'),(12,'David','Anderson','2036874125','david.anderson@email.com','0936854289','567 Calle Arce','1975-04-18','888-888-8888','Estados Unidos','Masculino'),(13,'Sofía','Lee','1236875942','sofia.lee@email.com','0923804083','876 Calle Pino','1992-08-25','999-999-9999','Canadá','Femenino'),(14,'Daniel','García','1725896541','daniel.garcia@email.com','0963588941','345 Calle Cedro','1983-12-12','101-101-1010','México','Masculino'),(15,'Olivia','Taylor','1236547885','olivia.taylor@email.com','0974258974','789 Calle Roble','1980-06-30','202-202-2020','Estados Unidos','Femenino'),(16,'Liam','Rodríguez','1024498742','liam.rodriguez@email.com','0985639685','234 Calle Abedul','1994-02-15','303-303-3030','México','Masculino'),(17,'Ava','Hernández','4589632587','ava.hernandez@email.com','0965411478','456 Calle Pino','1987-10-22','404-404-4040','España','Femenino'),(18,'Noah','López','1698745236','noah.lopez@email.com','0921456836','567 Calle Cedro','1998-07-08','505-505-5050','Estados Unidos','Masculino'),(19,'Emma','Ramírez','9632541258','emma.ramirez@email.com','0987456985','678 Calle Roble','1972-03-05','606-606-6060','México','Femenino'),(20,'Mía','Gómez','2587456985','mia.gomez@email.com','0956874126','789 Calle Olmo','1989-09-18','707-707-7070','Estados Unidos','Femenino'),(21,'Ethan','Pérez','1485693274','ethan.perez@email.com','0952368541','890 Calle Pino','1986-01-28','808-808-8080','Canadá','Masculino'),(22,'Isabella','Torres','2596874256','isabella.torres@email.com','0963254178','123 Calle Abedul','1979-12-03','909-909-9090','Estados Unidos','Femenino'),(23,'Aiden','Flores','1698742398','aiden.flores@email.com','0945203685','234 Calle Cedro','1991-04-14','101-101-1010','México','Masculino'),(24,'Sofía','González','4589357269','sophie.gonzalez@email.com','0954123698','345 Calle Olmo','1984-11-11','202-202-2020','Canadá','Femenino'),(25,'Jackson','Díaz','3698754289','jackson.diaz@email.com','09563102587','456 Calle Roble','1996-06-20','303-303-3030','Estados Unidos','Masculino'),(26,'Juan','Pérez','111111111','juan.perez@email.com','111-111-1111','123 Calle Principal','1990-01-01','222-222-2222','España','Masculino'),(27,'Ana','Gómez','222222222','ana.gomez@email.com','222-222-2222','456 Calle Roble','1985-05-15','333-333-3333','México','Femenino'),(28,'Roberto','Fernández','333333333','roberto.fernandez@email.com','333-333-3333','789 Calle Olmo','1978-09-30','444-444-4444','Argentina','Masculino'),(29,'Alicia','Martínez','444444444','alicia.martinez@email.com','444-444-4444','321 Calle Pino','1982-07-20','555-555-5555','Colombia','Femenino'),(30,'Carlos','López','555555555','carlos.lopez@email.com','555-555-5555','987 Calle Abedul','1995-03-10','666-666-6666','Chile','Masculino'),(31,'Eva','Martínez','666666666','eva.martinez@email.com','666-666-6666','234 Calle Cedro','1988-11-05','777-777-7777','España','Femenino'),(32,'David','Anderson','777777777','david.anderson@email.com','777-777-7777','567 Calle Arce','1975-04-18','888-888-8888','Estados Unidos','Masculino'),(33,'Sofía','Lee','888888888','sofia.lee@email.com','888-888-8888','876 Calle Pino','1992-08-25','999-999-9999','Canadá','Femenino'),(34,'Daniel','García','999999999','daniel.garcia@email.com','999-999-9999','345 Calle Cedro','1983-12-12','101-101-1010','México','Masculino'),(35,'Olivia','Taylor','101010101','olivia.taylor@email.com','101-101-1010','789 Calle Roble','1980-06-30','202-202-2020','Estados Unidos','Femenino'),(36,'Liam','Rodríguez','202020202','liam.rodriguez@email.com','202-202-2020','234 Calle Abedul','1994-02-15','303-303-3030','México','Masculino'),(37,'Ava','Hernández','303030303','ava.hernandez@email.com','303-303-3030','456 Calle Pino','1987-10-22','404-404-4040','España','Femenino'),(38,'Noah','López','404040404','noah.lopez@email.com','404-404-4040','567 Calle Cedro','1998-07-08','505-505-5050','Estados Unidos','Masculino'),(39,'Emma','Ramírez','505050505','emma.ramirez@email.com','505-505-5050','678 Calle Roble','1972-03-05','606-606-6060','México','Femenino'),(40,'Mía','Gómez','606060606','mia.gomez@email.com','606-606-6060','789 Calle Olmo','1989-09-18','707-707-7070','Estados Unidos','Femenino'),(41,'Ethan','Pérez','707070707','ethan.perez@email.com','707-707-7070','890 Calle Pino','1986-01-28','808-808-8080','Canadá','Masculino'),(42,'Isabella','Torres','808080808','isabella.torres@email.com','808-808-8080','123 Calle Abedul','1979-12-03','909-909-9090','Estados Unidos','Femenino'),(43,'Aiden','Flores','909090909','aiden.flores@email.com','909-909-9090','234 Calle Cedro','1991-04-14','101-101-1010','México','Masculino'),(44,'Sofía','González','1010101010','sophie.gonzalez@email.com','101-101-1010','345 Calle Olmo','1984-11-11','202-202-2020','Canadá','Femenino'),(45,'Jackson','Díaz','1111111111','jackson.diaz@email.com','111-111-1111','456 Calle Roble','1996-06-20','303-303-3030','Estados Unidos','Masculino');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 22:57:21
