/*
SQLyog Community v13.1.2 (64 bit)
MySQL - 10.4.13-MariaDB : Database - video_tutor_dev
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`video_tutor_dev` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `popuphistories` */

DROP TABLE IF EXISTS `popuphistories`;

CREATE TABLE `popuphistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `watchingId` int(11) NOT NULL,
  `isClicked` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `watchhistory` (`watchingId`),
  CONSTRAINT `watchhistory` FOREIGN KEY (`watchingId`) REFERENCES `watchinghistories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `popuphistories` */

insert  into `popuphistories`(`id`,`watchingId`,`isClicked`,`createdAt`,`updatedAt`) values 
(1,224,1,'2021-04-27 06:18:39','2021-04-27 06:18:41'),
(2,225,1,'2021-04-27 06:18:57','2021-04-27 06:18:58'),
(3,226,0,'2021-04-27 06:19:16','2021-04-27 06:19:16'),
(4,227,1,'2021-04-27 06:20:24','2021-04-27 06:20:25'),
(5,228,0,'2021-04-27 06:21:14','2021-04-27 06:21:14'),
(6,228,0,'2021-04-27 06:21:28','2021-04-27 06:21:28'),
(7,228,0,'2021-04-27 06:21:41','2021-04-27 06:21:41'),
(8,229,0,'2021-04-27 06:21:52','2021-04-27 06:21:52');

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('20210422042926-create-user.js'),
('20210422054530-create-user.js'),
('20210422071903-create-video.js'),
('20210422084826-create-watching-history.js'),
('20210422084936-create-watching-history.js'),
('20210422094802-create-popup-history.js');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `gender` enum('male','female','other') DEFAULT 'other',
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=589 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`fullName`,`email`,`password`,`createdAt`,`updatedAt`,`gender`,`role`,`deletedAt`) values 
(7,'admin','admin@gmail.com','$2a$10$9tPokfLZ4kIjp9QG.8qhQ.AgFT69HeO3xEiSbt5/X6W9oAmWbCeUa','2021-04-22 07:15:11','2021-04-23 17:15:45','other','ADMIN',NULL),
(86,'test','test@test.com','$2a$10$ab5zmaX23yePpx9fdkTF6eSQIVYf4XE6G5cxo.JCbHaXgfiE3h7fu','2021-04-22 12:33:12','2021-04-22 12:33:12','male','USER',NULL),
(588,'test','test@test.com','$2a$10$ab5zmaX23yePpx9fdkTF6eSQIVYf4XE6G5cxo.JCbHaXgfiE3h7fu','2021-04-22 12:33:12','2021-04-22 12:33:12','male','USER',NULL);

/*Table structure for table `videos` */

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `videoId` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `videos` */

insert  into `videos`(`videoId`,`id`,`title`,`src`,`createdAt`,`updatedAt`,`deletedAt`) values 
('90272c7ea3dffaab174c7c603db30180',16,'sfad','public\\videos\\90272c7ea3dffaab174c7c603db30180.mp4','2021-04-23 09:22:19','2021-04-23 09:22:19',NULL),
('b92d31d0d485ee6ff65254e8fee54e78.vnd.openxmlformats-officedocument.wordprocessingml',17,'test 1234','public\\videos\\b92d31d0d485ee6ff65254e8fee54e78.vnd.openxmlformats-officedocument.wordprocessingml.document','2021-04-23 09:22:49','2021-04-23 09:22:49',NULL),
('5f1bd1828f5abf8c5277b7d0ee082870',18,'test video 111','public\\videos\\5f1bd1828f5abf8c5277b7d0ee082870.mp4','2021-04-23 11:33:05','2021-04-23 11:33:05',NULL),
('ef36e3083fb84cd495342281382847f3',19,'test','public\\videos\\ef36e3083fb84cd495342281382847f3.mp4','2021-04-23 14:50:17','2021-04-23 14:50:17',NULL),
('1187ff56b6dfe12164d1960e7c51da1a',20,'test 1','public\\videos\\1187ff56b6dfe12164d1960e7c51da1a.mp4','2021-04-23 14:50:27','2021-04-23 14:50:27',NULL),
('1f5e26e89bb39e2812033b9734b5f377',21,'test 3','public\\videos\\1f5e26e89bb39e2812033b9734b5f377.mp4','2021-04-23 14:50:38','2021-04-23 14:50:38',NULL),
('65dd4e0b7a64329260d643269d8e9ca8',22,'test 4','public\\videos\\65dd4e0b7a64329260d643269d8e9ca8.mp4','2021-04-23 14:50:51','2021-04-23 14:50:51',NULL),
('77760c0c767d83b6628ea3c2dbc21d00',23,'simple','public\\videos\\77760c0c767d83b6628ea3c2dbc21d00.mp4','2021-04-23 14:51:00','2021-04-25 13:34:41',NULL),
('37d6735b911fb5ccbd7204b46c5c44fd',24,'test 6','public\\videos\\37d6735b911fb5ccbd7204b46c5c44fd.mp4','2021-04-23 14:51:21','2021-04-23 14:51:21',NULL),
('05f56f3cf9305b8012b070962e0eb0ce',25,'test 7','public\\videos\\05f56f3cf9305b8012b070962e0eb0ce.mp4','2021-04-23 14:51:29','2021-04-23 14:51:29',NULL),
('6d4e46bd8c0c5d3957c3984435855e55',26,'test 8','public\\videos\\6d4e46bd8c0c5d3957c3984435855e55.mp4','2021-04-23 14:51:38','2021-04-23 14:51:38',NULL);

/*Table structure for table `watchinghistories` */

DROP TABLE IF EXISTS `watchinghistories`;

CREATE TABLE `watchinghistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT 'UserId',
  `videoId` int(11) DEFAULT NULL COMMENT 'video id',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isFinished` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user` (`userId`),
  KEY `video` (`videoId`),
  CONSTRAINT `user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `video` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;

/*Data for the table `watchinghistories` */

insert  into `watchinghistories`(`id`,`userId`,`videoId`,`createdAt`,`updatedAt`,`isFinished`) values 
(223,86,23,'2021-04-27 06:16:04','2021-04-27 06:16:14',1),
(224,86,23,'2021-04-27 06:18:32','2021-04-27 06:18:42',1),
(225,86,23,'2021-04-27 06:18:50','2021-04-27 06:19:00',1),
(226,86,23,'2021-04-27 06:19:07','2021-04-27 06:19:17',1),
(227,86,23,'2021-04-27 06:20:16','2021-04-27 06:20:26',1),
(228,86,23,'2021-04-27 06:21:07','2021-04-27 06:21:07',0),
(229,86,23,'2021-04-27 06:21:45','2021-04-27 06:21:53',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
