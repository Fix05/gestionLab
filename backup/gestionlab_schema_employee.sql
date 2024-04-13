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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id_employee` int NOT NULL AUTO_INCREMENT,
  `pass_employee` varchar(45) NOT NULL,
  `permission_employee` varchar(45) NOT NULL,
  `department_employee` varchar(45) NOT NULL,
  `fk_person` int NOT NULL,
  `fk_contract` int DEFAULT NULL,
  `fk_salary_info` int DEFAULT NULL,
  `state_employee` varchar(45) NOT NULL,
  PRIMARY KEY (`id_employee`),
  KEY `fk_person` (`fk_person`),
  KEY `fk_contract` (`fk_contract`),
  KEY `fk_salary_info` (`fk_salary_info`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`fk_person`) REFERENCES `person` (`id_person`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`fk_contract`) REFERENCES `contract` (`id_contract`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`fk_salary_info`) REFERENCES `salary_info` (`id_salary_info`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (36,'password1','Admin','Teleco',1,1,1,'Activo'),(37,'123','User','HR',2,2,2,'De vacaciones'),(38,'password3','User','Finance',3,3,3,'Permiso'),(39,'123','Manager','Marketing',4,4,4,'Activo'),(40,'password5','User','Sales',5,5,5,'Activo'),(41,'password6','User','IT',6,NULL,6,'Activo'),(42,'pass123','User','Finance',7,NULL,7,'De vacaciones'),(43,'pass456','User','HR',8,NULL,8,'Permiso'),(44,'pass789','User','Marketing',9,NULL,9,'Activo'),(45,'password10','User','Sales',10,NULL,10,'Activo'),(46,'pass11','User','IT',11,NULL,11,'Activo'),(47,'pass12','User','Finance',12,NULL,12,'De vacaciones'),(48,'pass13','User','HR',13,NULL,13,'Permiso'),(49,'pass14','User','Marketing',14,NULL,14,'Activo'),(50,'pass15','User','Sales',15,NULL,15,'Activo'),(51,'pass16','User','IT',16,NULL,16,'Activo'),(52,'pass17','User','Finance',17,NULL,17,'De vacaciones'),(53,'pass18','User','HR',18,NULL,18,'Permiso'),(54,'pass19','User','Marketing',19,NULL,19,'Activo'),(55,'pass20','User','Sales',20,NULL,20,'Activo'),(56,'pass21','User','IT',21,NULL,21,'Activo'),(57,'pass22','User','Finance',22,NULL,22,'De vacaciones'),(58,'pass23','User','HR',23,NULL,23,'Permiso'),(59,'pass24','User','Marketing',24,NULL,24,'Activo'),(60,'pass25','User','Sales',25,NULL,25,'Activo');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
