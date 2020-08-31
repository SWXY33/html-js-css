/*
 Navicat Premium Data Transfer

 Source Server         : lushanli
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : water

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 31/08/2020 11:54:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `headimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `loginTime` datetime(0) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '66', '15177553656', 'lushanli', '123456', NULL, 'dapojie', 'lu');
INSERT INTO `user` VALUES (29, 'ðŸ¥°ÂªÂº', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/iaBDFuU0TItyiaLev38naicUnYPATkYv7MkcZzoKsicMnU6lZh4gEASgOC1kmP5BicVibBicbhBW3zEAq9lvTw227FwBQ/132', 'oe2NX4xG-_-L2DhO78R5BKL-OlNI', '2020-07-29 16:57:20', '大坡街', '陆珊莉');
INSERT INTO `user` VALUES (30, 'ðŸ¥°ÂªÂº', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/iaBDFuU0TItyiaLev38naicUnYPATkYv7MkcZzoKsicMnU6lZh4gEASgOC1kmP5BicVibBicbhBW3zEAq9lvTw227FwBQ/132', 'oe2NX4xG-_-L2DhO78R5BKL-OlNI', '2020-07-29 17:00:26', '大坡街', 'test');
INSERT INTO `user` VALUES (31, 'ðŸ¥°ÂªÂº', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/iaBDFuU0TItyiaLev38naicUnYPATkYv7MkcZzoKsicMnU6lZh4gEASgOC1kmP5BicVibBicbhBW3zEAq9lvTw227FwBQ/132', 'oe2NX4xG-_-L2DhO78R5BKL-OlNI', '2020-07-29 17:07:55', '塘坪', 'test');
INSERT INTO `user` VALUES (32, 'ðŸ¥°ÂªÂº', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/iaBDFuU0TItyiaLev38naicUnYPATkYv7MkcZzoKsicMnU6lZh4gEASgOC1kmP5BicVibBicbhBW3zEAq9lvTw227FwBQ/132', 'oe2NX4xG-_-L2DhO78R5BKL-OlNI', '2020-07-29 17:09:02', NULL, NULL);

-- ----------------------------
-- Table structure for user_water
-- ----------------------------
DROP TABLE IF EXISTS `user_water`;
CREATE TABLE `user_water`  (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `water_id` int NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `water_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_water
-- ----------------------------
INSERT INTO `user_water` VALUES (1, 1, 1);

-- ----------------------------
-- Table structure for water_data
-- ----------------------------
DROP TABLE IF EXISTS `water_data`;
CREATE TABLE `water_data`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NULL DEFAULT NULL COMMENT '日期',
  `read_num` int NULL DEFAULT NULL COMMENT '水表读数(单位：m³)',
  `water_id` int NULL DEFAULT NULL COMMENT '水表号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of water_data
-- ----------------------------
INSERT INTO `water_data` VALUES (1, '2016-01-29', 0, 1);
INSERT INTO `water_data` VALUES (2, '2020-01-01', 10, 1);
INSERT INTO `water_data` VALUES (3, '2020-07-01', 66, 1);

SET FOREIGN_KEY_CHECKS = 1;
