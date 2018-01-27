/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : wx_info

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';


-- ----------------------------
--  Table structure for `cGroupInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cGroupInfo`;
CREATE TABLE `cGroupInfo` (
  `user_open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `group_id` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `group_name` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群组信息';


-- ----------------------------
--  Table structure for `cGroupTask`
-- ----------------------------
DROP TABLE IF EXISTS `cGroupTask`;
CREATE TABLE `cGroupTask` (
  `task_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `share_ticket` varchar(100) COLLATE utf8mb4_unicode_ci,
  `create_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_single` tinyint(1) DEFAULT 0,
  `req_location` tinyint(1) DEFAULT 0,
  `req_name` tinyint(1) DEFAULT 0,
  `end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群任务信息';

SET FOREIGN_KEY_CHECKS = 1;