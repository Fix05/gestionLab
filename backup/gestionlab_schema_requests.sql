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
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id_request` int NOT NULL AUTO_INCREMENT,
  `type_request` varchar(45) NOT NULL,
  `reason_request` varchar(90) NOT NULL,
  `explanation_request` varchar(500) NOT NULL,
  `rh_manager` int NOT NULL,
  `fk_employee` int NOT NULL,
  `date_request` date NOT NULL,
  `document_request` varchar(45) DEFAULT NULL,
  `state_request` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_request`),
  KEY `fk_requests_employee` (`fk_employee`),
  KEY `fk_requests_manager` (`rh_manager`),
  CONSTRAINT `fk_requests_employee` FOREIGN KEY (`fk_employee`) REFERENCES `employee` (`id_employee`),
  CONSTRAINT `fk_requests_manager` FOREIGN KEY (`rh_manager`) REFERENCES `employee` (`id_employee`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'cambio de horario','Horario modificado','Necesito una nueva hora de entrada y salida, debedio a problemas personales relacionados con la salud de un familiar necesito tener la mañana libre, podría empezar mi jornada a partir de las 12 pm',39,37,'2024-01-23','doc001','Aprobado'),(2,'permiso','Permiso por asuntos personales','Necesito tiempo libre para resolver asuntos personales',39,37,'2024-02-15','doc002','Denegado'),(3,'cambio de datos','Actualización de información','Cambio de dirección y número de contacto',39,37,'2024-03-10','doc003','Denegado'),(4,'reclamaciones','Reclamación de salario','No he recibido el salario correspondiente',39,37,'2024-04-05','doc004','Denegado'),(5,'adelanto','Solicitud de adelanto salarial','Necesito un adelanto para gastos inesperados',39,37,'2024-05-20','doc005','Denegado'),(6,'vacaciones','Solicitud de vacaciones','Necesito tomar unos días de descanso',39,37,'2024-06-15','doc006','Denegado'),(7,'cambio de horario','Horario modificado','Nueva hora de entrada y salida',39,37,'2024-07-01','doc007','Denegado'),(8,'permiso','Permiso por asuntos personales','Necesito tiempo libre para resolver asuntos personales',39,37,'2024-08-10','doc008','Esperando'),(9,'cambio de datos','Actualización de información','Cambio de dirección y número de contacto',39,37,'2024-09-05','doc009','Esperando'),(10,'reclamaciones','Reclamación de salario','No he recibido el salario correspondiente',39,37,'2024-10-18','doc010','Esperando'),(11,'adelanto','Solicitud de adelanto salarial','Necesito un adelanto para gastos inesperados',39,37,'2024-11-30','doc011','Aprobado'),(12,'vacaciones','Solicitud de vacaciones','Necesito tomar unos días de descanso',39,37,'2024-12-22','doc012','Aprobado'),(13,'cambio de horario','Horario modificado','Nueva hora de entrada y salida',39,37,'2025-01-10','doc013','Aprobado'),(14,'permiso','Permiso por asuntos personales','Necesito tiempo libre para resolver asuntos personales',39,37,'2025-02-22','doc014','Aprobado'),(15,'cambio de datos','Actualización de información','Cambio de dirección y número de contacto',39,37,'2025-03-15','doc015','Aprobado'),(16,'reclamaciones','Reclamación de salario','No he recibido el salario correspondiente',39,37,'2025-04-10','doc016','Aprobado'),(17,'adelanto','Solicitud de adelanto salarial','Necesito un adelanto para gastos inesperados',39,37,'2025-05-05','doc017','Aprobado'),(18,'vacaciones','Solicitud de vacaciones','Necesito tomar unos días de descanso',39,37,'2025-06-20','doc018','Denegado'),(19,'cambio de horario','Horario modificado','Nueva hora de entrada y salida',39,37,'2025-07-01','doc019','Aprobado'),(20,'permiso','Permiso por asuntos personales','Necesito tiempo libre para resolver asuntos personales',39,37,'2025-08-10','doc020','Aprobado');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
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
