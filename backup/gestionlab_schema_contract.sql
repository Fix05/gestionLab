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
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id_contract` int NOT NULL AUTO_INCREMENT,
  `duration_contract` varchar(45) NOT NULL COMMENT '"indefinido", "temporal", "a plazo fijo"',
  `hours_per_day` varchar(45) DEFAULT NULL,
  `benefits_contract` varchar(45) DEFAULT NULL COMMENT 'Lista de beneficios asociados con este tipo de contrato, como seguro médico, vacaciones pagadas, etc.',
  `start_day_contract` varchar(45) NOT NULL,
  `special_requirements` varchar(45) DEFAULT NULL COMMENT 'Cualquier requisito especial asociado con este tipo de contrato.',
  `bonuses_contract` varchar(45) DEFAULT NULL,
  `description_contract` varchar(45) DEFAULT NULL,
  `days_vacation` int NOT NULL,
  PRIMARY KEY (`id_contract`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,'2 Días','1','Health insurance','2024-01-01','None','1000.00','Full-time position',20),(2,'6 months','7 hours','Vacation days','2024-02-15','Experience in programming','110.21','Part-time position',25),(3,'2 years','9 hours','401(k) plan','2024-03-10','Fluent in multiple languages','1200.00','Senior Developer role',15),(4,'1.5 years','8.5 hours','Flexible schedule','2024-04-05','Project management skills','900.00','Project Manager',30),(5,'1 year','8 hours','Performance bonuses','2024-05-20','None','1500.00','Marketing Specialist',18);
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 22:57:20
