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
-- Table structure for table `extras_record`
--

DROP TABLE IF EXISTS `extras_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extras_record` (
  `id_extras_record` int NOT NULL AUTO_INCREMENT,
  `hours_extras` int NOT NULL,
  `date_extras` date NOT NULL,
  `amount_extras` float NOT NULL,
  `state_extra` varchar(45) NOT NULL,
  `description_extras` varchar(55) NOT NULL,
  `fk_salary_info` int NOT NULL,
  PRIMARY KEY (`id_extras_record`),
  KEY `fk_salary_info` (`fk_salary_info`),
  CONSTRAINT `extras_record_ibfk_1` FOREIGN KEY (`fk_salary_info`) REFERENCES `salary_info` (`id_salary_info`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extras_record`
--

LOCK TABLES `extras_record` WRITE;
/*!40000 ALTER TABLE `extras_record` DISABLE KEYS */;
INSERT INTO `extras_record` VALUES (1,2,'2024-02-05',60,'Por pagar','Ayuda de proyecto de ventas',1),(2,2,'2024-02-10',60,'Por pagar','Ayuda de proyecto de ventas',3),(3,3,'2024-02-20',60,'Por pagar','Ayuda de proyecto de ventas',3),(4,3,'2024-03-31',60,'Por pagar','Ayuda de proyecto de ventas',3),(5,2,'2024-01-04',136,'Por pagar','Reporte anual',3),(162,1,'2024-04-05',24,'Por pagar','',7),(165,1,'2024-04-05',36,'Por pagar','',10),(274,4,'2024-04-12',25,'Por pagar','Reporte Adicional',3),(276,1,'2024-04-12',12,'Por pagar','Reporte Adicional',3),(278,5,'2024-04-12',120,'Por pagar','Reporte Adicional',9),(279,3,'2024-04-12',54,'Por pagar','Reporte Adicional',2);
/*!40000 ALTER TABLE `extras_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 22:57:23
