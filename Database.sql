CREATE DATABASE  IF NOT EXISTS `dudee_exam_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dudee_exam_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: dudee_exam_db
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

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
-- Table structure for table `washing_mc_info`
--

DROP TABLE IF EXISTS `washing_mc_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `washing_mc_info` (
  `machine_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `machine_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `machine_status` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `pay_method` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `wash_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`machine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `washing_mc_info`
--

LOCK TABLES `washing_mc_info` WRITE;
/*!40000 ALTER TABLE `washing_mc_info` DISABLE KEYS */;
INSERT INTO `washing_mc_info` VALUES ('WSMC1644190503314','WM no.1','empty','','2022-02-07 11:54:05','2022-02-07 11:56:05',0),('WSMC1644190790824','WM no.2','empty','','2022-02-07 12:15:27','2022-02-07 12:15:27',0),('WSMC1644190796151','WM no.3','empty','','2022-02-07 13:43:49','2022-02-07 13:43:49',0),('WSMC1644190800986','WM no.4','empty','','2022-02-08 10:25:48','2022-02-08 10:25:48',0),('WSMC1644190808462','WM no.5','empty','','2022-02-08 09:40:34','2022-02-08 09:40:34',0),('WSMC1644233179017','WM no.6','empty',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `washing_mc_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-08 10:41:46
