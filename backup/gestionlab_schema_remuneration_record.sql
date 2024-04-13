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
-- Table structure for table `remuneration_record`
--

DROP TABLE IF EXISTS `remuneration_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remuneration_record` (
  `id_remuneration_record` int NOT NULL AUTO_INCREMENT,
  `date_remuneration` datetime DEFAULT NULL,
  `min_pay_date_remuneration` date NOT NULL,
  `max_pay_date_remuneration` date NOT NULL,
  `amount_remuneration` float DEFAULT NULL,
  `state_remuneration` varchar(45) NOT NULL,
  `fk_salary_info` int NOT NULL,
  PRIMARY KEY (`id_remuneration_record`),
  KEY `fk_salary_info` (`fk_salary_info`),
  CONSTRAINT `remuneration_record_ibfk_1` FOREIGN KEY (`fk_salary_info`) REFERENCES `salary_info` (`id_salary_info`)
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remuneration_record`
--

LOCK TABLES `remuneration_record` WRITE;
/*!40000 ALTER TABLE `remuneration_record` DISABLE KEYS */;
INSERT INTO `remuneration_record` VALUES (1,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',1),(2,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',2),(3,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',3),(4,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',4),(5,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',5),(6,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',6),(7,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',7),(8,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',8),(9,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',9),(10,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',10),(11,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',11),(12,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',12),(13,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',13),(14,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',14),(15,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',15),(16,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',16),(17,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',17),(18,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',18),(19,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',19),(20,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',20),(21,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',21),(22,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',22),(23,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',23),(24,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',24),(25,NULL,'2024-02-01','2024-03-01',NULL,'Atrasado',25),(26,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',1),(27,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',2),(28,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',3),(29,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',4),(30,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',5),(31,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',6),(32,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',7),(33,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',8),(34,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',9),(35,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',10),(36,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',11),(37,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',12),(38,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',13),(39,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',14),(40,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',15),(41,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',16),(42,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',17),(43,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',18),(44,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',19),(45,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',20),(46,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',21),(47,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',22),(48,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',23),(49,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',24),(50,NULL,'2024-03-01','2024-04-01',NULL,'Atrasado',25),(213,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',2),(214,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',3),(215,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',5),(216,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',6),(217,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',7),(218,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',8),(219,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',9),(220,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',10),(221,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',11),(222,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',12),(223,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',13),(224,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',14),(225,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',15),(226,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',16),(227,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',17),(228,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',18),(229,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',19),(230,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',20),(231,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',21),(232,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',22),(233,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',23),(234,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',24),(235,NULL,'2024-04-01','2024-05-01',NULL,'Por pagar',25);
/*!40000 ALTER TABLE `remuneration_record` ENABLE KEYS */;
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
