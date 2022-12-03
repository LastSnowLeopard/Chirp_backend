CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` int(100) DEFAULT NULL,
  `password` int(50) DEFAULT NULL,
  `account_type` enum('user','creator') DEFAULT NULL,
  `otp` varchar(4) DEFAULT NULL,
  `notification_status` enum('on','off') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;