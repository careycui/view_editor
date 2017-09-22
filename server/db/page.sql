/*
Navicat MySQL Data Transfer

Source Server         : ys-s1
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : page

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2017-09-22 18:00:23
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
  `t_type` varchar(255) DEFAULT 'pro',
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `desc` varchar(255) DEFAULT NULL COMMENT '页面描述',
  `img_cover` varchar(255) DEFAULT NULL,
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
INSERT INTO `pro_page` VALUES ('c11fabdf-8f18-441c-a65d-a89f09a7ebc9', 'pro', '23是对方的说法的上方方 ', '详情页测试第一份士大夫撒旦法大师范德萨发第三方是似懂非懂是', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-21 04:24:10', null, 'DATA', 'page data', 'html data', null);
INSERT INTO `pro_page` VALUES ('2764cc01-257c-473c-90eb-02decd57dac6', 'pro', '12312第二次基本信息测试', '这是第二次基本信息测试这是第二次基本信息测试这是第二次基本信息测试这是第二次基本信息测试这是第二次基本信息测试', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-21 06:08:44', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('59721c78-3c8e-474f-bdb0-37d73395c1a9', 'pro', null, null, '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '1', '1', '2017-09-21 06:09:02', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('81fd400a-9844-46ef-ab9b-bb685194ac75', 'pro', null, null, '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '1', '1', '2017-09-21 08:32:00', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('bbe17324-d0f1-425d-ab7d-7116583f298d', 'pro', null, null, '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '1', '1', '2017-09-21 08:32:45', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('48057dac-ac53-4877-b024-ef8de1940027', 'pro', '是范德萨范德萨范德萨发', '水电费第三方第三方的谁发是东方闪电', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-21 08:33:44', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('2cb83c56-8a61-4129-8501-ced74b21209e', 'pro', '沃尔沃而432 是的范德萨范德萨', '水电费是电风扇的 ', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-21 08:40:28', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('32c5a31c-2b6b-43c5-94cf-db6a99ab5ea5', 'pro', '水电费第三方第三方的谁发热惹我', '色儿五女店  ', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-22 01:13:18', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('b607d07e-51f4-4079-9af4-fd7783994e50', 'pro', '未命名页面', '未添加描述', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '1', '2017-09-22 02:31:03', null, null, null, null, null);
INSERT INTO `pro_page` VALUES ('edad760b-a0ba-4a07-bc33-5d82552a58c6', 'pro', '未命名页面', '未添加描述', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-22 09:27:09', null, null, null, null, null);

-- ----------------------------
-- Table structure for topic_page
-- ----------------------------
DROP TABLE IF EXISTS `topic_page`;
CREATE TABLE `topic_page` (
  `id` varchar(100) NOT NULL,
  `t_type` varchar(255) DEFAULT 'topic',
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `desc` varchar(255) DEFAULT NULL COMMENT '页面描述',
  `img_cover` varchar(255) DEFAULT NULL,
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
INSERT INTO `topic_page` VALUES ('5a7e10ff-9bd7-4e9e-b1b6-3f03b4b7b93e', 'topic', '是对方的说法的上方', '是非得失范德萨发', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '0', '2017-09-21 06:12:11', null, null, null, null, null);
INSERT INTO `topic_page` VALUES ('498c1583-2207-4183-9a06-cad57a102914', 'topic', null, '水电费第三方第三方的谁发水电费', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '0', '1', '2017-09-21 06:12:22', null, null, null, null, null);
INSERT INTO `topic_page` VALUES ('3f3fa05a-0126-4a19-9076-d11de0d3d7ca', 'topic', '未命名页面', '未添加描述', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '1', '0', '2017-09-22 03:44:50', null, null, null, null, null);
INSERT INTO `topic_page` VALUES ('b8244faf-7f6c-4485-8cb6-f18f5cc84fac', 'topic', '未命名页面', '未添加描述', '//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg', '1', '0', '2017-09-22 03:46:06', null, null, null, null, null);
