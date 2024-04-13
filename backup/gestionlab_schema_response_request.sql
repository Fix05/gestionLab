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
-- Table structure for table `response_request`
--

DROP TABLE IF EXISTS `response_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `response_request` (
  `id_response_request` int NOT NULL AUTO_INCREMENT,
  `body_response_request` varchar(500) NOT NULL,
  `date_response_request` datetime DEFAULT NULL,
  `fk_request` int DEFAULT NULL,
  PRIMARY KEY (`id_response_request`),
  UNIQUE KEY `unique_fk_request` (`fk_request`),
  CONSTRAINT `response_request_ibfk_1` FOREIGN KEY (`fk_request`) REFERENCES `requests` (`id_request`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response_request`
--

LOCK TABLES `response_request` WRITE;
/*!40000 ALTER TABLE `response_request` DISABLE KEYS */;
INSERT INTO `response_request` VALUES (1,'Lamentamos decirle que su solicitud no puede ser aprobada','2024-02-28 00:00:00',2),(2,'Podemos aceptar su solicitud y permitir un cambio de horario por 4 meses','2024-03-02 12:30:45',20),(5,'Ok','2024-03-02 12:30:45',1),(19,'asdad','2024-03-03 07:31:09',9),(30,'Ok','2024-03-03 07:58:59',11),(31,'Ok','2024-03-03 07:59:51',15),(32,'Ok','2024-03-03 08:03:42',16),(34,'No','2024-03-03 08:05:28',18),(35,'NO','2024-03-03 23:34:35',7),(36,'NO','2024-03-03 23:37:27',6);
/*!40000 ALTER TABLE `response_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 22:57:22
