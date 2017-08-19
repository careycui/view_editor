/*
Navicat MySQL Data Transfer

Source Server         : ys-s1
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : page

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2017-08-19 15:39:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for page_concat
-- ----------------------------
DROP TABLE IF EXISTS `page_concat`;
CREATE TABLE `page_concat` (
  `id` varchar(60) NOT NULL,
  `page_id` varchar(60) DEFAULT NULL,
  `concat_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of page_concat
-- ----------------------------

-- ----------------------------
-- Table structure for pro_page
-- ----------------------------
DROP TABLE IF EXISTS `pro_page`;
CREATE TABLE `pro_page` (
  `id` varchar(100) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `desc` varchar(255) DEFAULT NULL COMMENT '页面描述',
  `platform_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面平台类型\r\n0 pc平台 默认值\r\n1 手机端 ',
  `page_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面类型\r\n0 普通页面\r\n1 海报类页面',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `form_data` mediumtext COMMENT '页面数据，各模块的form数据',
  `page_data` mediumtext COMMENT '页面结构json数据\r\n',
  `html_data` mediumtext COMMENT '页面HTML字符串',
  `concat_id` varchar(60) DEFAULT NULL COMMENT '关联的另一个平台的页面',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pro_page
-- ----------------------------

-- ----------------------------
-- Table structure for topic_page
-- ----------------------------
DROP TABLE IF EXISTS `topic_page`;
CREATE TABLE `topic_page` (
  `id` varchar(100) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `desc` varchar(255) DEFAULT NULL COMMENT '页面描述',
  `platform_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面平台类型\r\n0 pc平台 默认值\r\n1 手机端 ',
  `page_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面类型\r\n0 普通页面\r\n1 海报类页面',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `form_data` mediumtext COMMENT '页面数据，各模块的form数据',
  `page_data` mediumtext COMMENT '页面结构json数据\r\n',
  `html_data` mediumtext COMMENT '页面HTML字符串',
  `concat_id` varchar(60) DEFAULT NULL COMMENT '关联的另一个平台的页面',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topic_page
-- ----------------------------
