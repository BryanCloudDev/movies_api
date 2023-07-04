-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-07-2023 a las 12:51:02
-- Versión del servidor: 8.0.33-0ubuntu0.22.04.2
-- Versión de PHP: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `movies`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liked_movie`
--

CREATE TABLE `liked_movie` (
  `id` int NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `movieId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `liked_movie`
--

INSERT INTO `liked_movie` (`id`, `createdOn`, `updatedOn`, `movieId`, `userId`) VALUES
(1, '2023-07-04 06:47:35.617991', '2023-07-04 06:47:35.617991', 10, 8),
(2, '2023-07-04 06:47:35.619104', '2023-07-04 06:47:35.619104', 4, 7),
(3, '2023-07-04 06:47:35.620316', '2023-07-04 06:47:35.620316', 10, 3),
(4, '2023-07-04 06:47:35.621772', '2023-07-04 06:47:35.621772', 1, 9),
(5, '2023-07-04 06:47:35.623112', '2023-07-04 06:47:35.623112', 18, 4),
(6, '2023-07-04 06:47:35.624445', '2023-07-04 06:47:35.624445', 1, 1),
(7, '2023-07-04 06:47:35.625671', '2023-07-04 06:47:35.625671', 18, 8),
(8, '2023-07-04 06:47:35.626734', '2023-07-04 06:47:35.626734', 16, 6),
(9, '2023-07-04 06:47:35.627741', '2023-07-04 06:47:35.627741', 12, 6),
(10, '2023-07-04 06:47:35.636327', '2023-07-04 06:47:35.636327', 11, 10),
(11, '2023-07-04 06:47:35.648740', '2023-07-04 06:47:35.648740', 19, 8),
(12, '2023-07-04 06:47:35.650964', '2023-07-04 06:47:35.650964', 13, 5),
(13, '2023-07-04 06:47:35.652410', '2023-07-04 06:47:35.652410', 17, 8),
(14, '2023-07-04 06:47:35.657659', '2023-07-04 06:47:35.657659', 19, 10),
(15, '2023-07-04 06:47:35.658590', '2023-07-04 06:47:35.658590', 6, 5),
(16, '2023-07-04 06:47:35.664688', '2023-07-04 06:47:35.664688', 2, 5),
(17, '2023-07-04 06:47:35.665794', '2023-07-04 06:47:35.665794', 15, 3),
(18, '2023-07-04 06:47:35.667009', '2023-07-04 06:47:35.667009', 5, 9),
(19, '2023-07-04 06:47:35.675954', '2023-07-04 06:47:35.675954', 15, 7),
(20, '2023-07-04 06:47:35.676969', '2023-07-04 06:47:35.676969', 18, 11),
(21, '2023-07-04 06:47:35.678003', '2023-07-04 06:47:35.678003', 8, 5),
(22, '2023-07-04 06:47:35.678998', '2023-07-04 06:47:35.678998', 12, 10),
(23, '2023-07-04 06:47:35.691279', '2023-07-04 06:47:35.691279', 15, 11),
(24, '2023-07-04 06:47:35.693472', '2023-07-04 06:47:35.693472', 12, 1),
(25, '2023-07-04 06:47:35.694927', '2023-07-04 06:47:35.694927', 10, 11),
(26, '2023-07-04 06:47:35.703894', '2023-07-04 06:47:35.703894', 18, 2),
(27, '2023-07-04 06:47:35.705019', '2023-07-04 06:47:35.705019', 18, 10),
(28, '2023-07-04 06:47:35.706074', '2023-07-04 06:47:35.706074', 11, 2),
(29, '2023-07-04 06:47:35.707319', '2023-07-04 06:47:35.707319', 5, 7),
(30, '2023-07-04 06:47:35.713991', '2023-07-04 06:47:35.713991', 9, 5),
(31, '2023-07-04 06:47:35.715116', '2023-07-04 06:47:35.715116', 10, 7),
(32, '2023-07-04 06:47:35.716278', '2023-07-04 06:47:35.716278', 2, 7),
(33, '2023-07-04 06:47:35.717352', '2023-07-04 06:47:35.717352', 16, 5),
(34, '2023-07-04 06:47:35.723326', '2023-07-04 06:47:35.723326', 2, 9),
(35, '2023-07-04 06:47:35.729142', '2023-07-04 06:47:35.729142', 11, 9),
(36, '2023-07-04 06:47:35.733013', '2023-07-04 06:47:35.733013', 19, 10),
(37, '2023-07-04 06:47:35.740659', '2023-07-04 06:47:35.740659', 11, 4),
(38, '2023-07-04 06:47:35.741952', '2023-07-04 06:47:35.741952', 12, 5),
(39, '2023-07-04 06:47:35.752604', '2023-07-04 06:47:35.752604', 8, 9),
(40, '2023-07-04 06:47:35.757402', '2023-07-04 06:47:35.757402', 7, 7),
(41, '2023-07-04 06:47:35.762093', '2023-07-04 06:47:35.762093', 12, 8),
(42, '2023-07-04 06:47:35.766453', '2023-07-04 06:47:35.766453', 3, 10),
(43, '2023-07-04 06:47:35.770173', '2023-07-04 06:47:35.770173', 5, 9),
(44, '2023-07-04 06:47:35.771293', '2023-07-04 06:47:35.771293', 5, 2),
(45, '2023-07-04 06:47:35.773241', '2023-07-04 06:47:35.773241', 16, 3),
(46, '2023-07-04 06:47:35.779334', '2023-07-04 06:47:35.779334', 20, 9),
(47, '2023-07-04 06:47:35.792208', '2023-07-04 06:47:35.792208', 3, 10),
(48, '2023-07-04 06:47:35.793833', '2023-07-04 06:47:35.793833', 3, 11),
(49, '2023-07-04 06:47:35.801681', '2023-07-04 06:47:35.801681', 10, 1),
(50, '2023-07-04 06:47:35.803083', '2023-07-04 06:47:35.803083', 10, 11),
(51, '2023-07-04 06:47:35.804521', '2023-07-04 06:47:35.804521', 16, 5),
(52, '2023-07-04 06:47:35.805814', '2023-07-04 06:47:35.805814', 16, 6),
(53, '2023-07-04 06:47:35.820612', '2023-07-04 06:47:35.820612', 17, 9),
(54, '2023-07-04 06:47:35.821874', '2023-07-04 06:47:35.821874', 19, 6),
(55, '2023-07-04 06:47:35.823291', '2023-07-04 06:47:35.823291', 10, 7),
(56, '2023-07-04 06:47:35.836867', '2023-07-04 06:47:35.836867', 7, 7),
(57, '2023-07-04 06:47:35.837764', '2023-07-04 06:47:35.837764', 4, 9),
(58, '2023-07-04 06:47:35.840630', '2023-07-04 06:47:35.840630', 8, 1),
(59, '2023-07-04 06:47:35.843535', '2023-07-04 06:47:35.843535', 11, 10),
(60, '2023-07-04 06:47:35.849047', '2023-07-04 06:47:35.849047', 11, 1),
(61, '2023-07-04 06:47:35.850131', '2023-07-04 06:47:35.850131', 3, 7),
(62, '2023-07-04 06:47:35.855230', '2023-07-04 06:47:35.855230', 1, 4),
(63, '2023-07-04 06:47:35.859791', '2023-07-04 06:47:35.859791', 13, 3),
(64, '2023-07-04 06:47:35.860702', '2023-07-04 06:47:35.860702', 13, 3),
(65, '2023-07-04 06:47:35.865743', '2023-07-04 06:47:35.865743', 2, 7),
(66, '2023-07-04 06:47:35.866764', '2023-07-04 06:47:35.866764', 10, 8),
(67, '2023-07-04 06:47:35.871745', '2023-07-04 06:47:35.871745', 19, 6),
(68, '2023-07-04 06:47:35.890070', '2023-07-04 06:47:35.890070', 20, 8),
(69, '2023-07-04 06:47:35.899668', '2023-07-04 06:47:35.899668', 6, 6),
(70, '2023-07-04 06:47:35.901327', '2023-07-04 06:47:35.901327', 9, 9),
(71, '2023-07-04 06:47:35.904867', '2023-07-04 06:47:35.904867', 7, 1),
(72, '2023-07-04 06:47:35.906660', '2023-07-04 06:47:35.906660', 4, 6),
(73, '2023-07-04 06:47:35.907564', '2023-07-04 06:47:35.907564', 20, 4),
(74, '2023-07-04 06:47:35.912973', '2023-07-04 06:47:35.912973', 13, 4),
(75, '2023-07-04 06:47:35.914358', '2023-07-04 06:47:35.914358', 13, 7),
(76, '2023-07-04 06:47:35.918194', '2023-07-04 06:47:35.918194', 8, 3),
(77, '2023-07-04 06:47:35.926066', '2023-07-04 06:47:35.926066', 18, 1),
(78, '2023-07-04 06:47:35.930046', '2023-07-04 06:47:35.930046', 15, 8),
(79, '2023-07-04 06:47:35.939192', '2023-07-04 06:47:35.939192', 8, 4),
(80, '2023-07-04 06:47:35.941103', '2023-07-04 06:47:35.941103', 7, 5),
(81, '2023-07-04 06:47:35.954062', '2023-07-04 06:47:35.954062', 10, 5),
(82, '2023-07-04 06:47:35.958447', '2023-07-04 06:47:35.958447', 10, 1),
(83, '2023-07-04 06:47:35.959761', '2023-07-04 06:47:35.959761', 2, 1),
(84, '2023-07-04 06:47:35.960927', '2023-07-04 06:47:35.960927', 17, 7),
(85, '2023-07-04 06:47:35.962911', '2023-07-04 06:47:35.962911', 14, 2),
(86, '2023-07-04 06:47:35.968951', '2023-07-04 06:47:35.968951', 8, 4),
(87, '2023-07-04 06:47:35.974089', '2023-07-04 06:47:35.974089', 15, 3),
(88, '2023-07-04 06:47:35.975493', '2023-07-04 06:47:35.975493', 13, 3),
(89, '2023-07-04 06:47:35.979730', '2023-07-04 06:47:35.979730', 7, 5),
(90, '2023-07-04 06:47:35.988954', '2023-07-04 06:47:35.988954', 5, 5),
(91, '2023-07-04 06:47:35.990289', '2023-07-04 06:47:35.990289', 1, 1),
(92, '2023-07-04 06:47:35.994026', '2023-07-04 06:47:35.994026', 9, 1),
(93, '2023-07-04 06:47:35.998471', '2023-07-04 06:47:35.998471', 7, 3),
(94, '2023-07-04 06:47:36.010429', '2023-07-04 06:47:36.010429', 17, 6),
(95, '2023-07-04 06:47:36.014995', '2023-07-04 06:47:36.014995', 15, 8),
(96, '2023-07-04 06:47:36.016136', '2023-07-04 06:47:36.016136', 17, 10),
(97, '2023-07-04 06:47:36.017550', '2023-07-04 06:47:36.017550', 6, 6),
(98, '2023-07-04 06:47:36.019544', '2023-07-04 06:47:36.019544', 14, 3),
(99, '2023-07-04 06:47:36.023678', '2023-07-04 06:47:36.023678', 4, 7),
(100, '2023-07-04 06:47:36.024979', '2023-07-04 06:47:36.024979', 2, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie`
--

CREATE TABLE `movie` (
  `id` int NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `director` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `genre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `releaseDate` datetime DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `rating` int NOT NULL,
  `countryOrigin` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `poster` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movie`
--

INSERT INTO `movie` (`id`, `createdOn`, `updatedOn`, `name`, `description`, `director`, `genre`, `releaseDate`, `duration`, `rating`, `countryOrigin`, `language`, `poster`, `status`) VALUES
(1, '2023-07-04 06:47:35.482034', '2023-07-04 06:47:35.482034', 'nihil quam', 'Accusantium facere suscipit voluptate fugiat quae ut debitis. Eveniet vitae error commodi expedita. Itaque incidunt voluptatibus.', 'Delores Jaskolski', 'Drama', '2023-05-19 16:16:46', 137, 1, 'Kuwait', 'UM', 'https://loremflickr.com/640/480?lock=8384925484974080', 1),
(2, '2023-07-04 06:47:35.510356', '2023-07-04 06:47:35.510356', 'sequi dolor', 'Vel repudiandae consectetur sapiente enim aut rem. Dolores exercitationem vitae labore. Ut officiis atque ipsam debitis.', 'Adam Heaney PhD', 'Romance', '2022-07-25 11:37:54', 98, 9, 'Nigeria', 'AW', 'https://loremflickr.com/640/480?lock=5424264060600320', 1),
(3, '2023-07-04 06:47:35.512366', '2023-07-04 06:47:35.512366', 'possimus cupiditate', 'Delectus repellat nostrum officia voluptatum culpa odit illo vitae. Suscipit dolore maiores beatae atque incidunt vero autem. Eaque temporibus hic.', 'Archie Cronin II', 'Fantasy', '2022-07-17 08:55:54', 148, 9, 'Tunisia', 'NE', 'https://loremflickr.com/640/480?lock=1398271710855168', 1),
(4, '2023-07-04 06:47:35.533604', '2023-07-04 06:47:35.533604', 'maiores in', 'Natus laboriosam vero ratione quibusdam nostrum. Odio debitis expedita. Delectus quae illo dicta dicta neque accusamus facere soluta maiores.', 'Salvador Kilback PhD', 'Sci-Fi', '2023-05-10 21:42:33', 173, 7, 'Burkina Faso', 'BT', 'https://loremflickr.com/640/480?lock=1952781707509760', 1),
(5, '2023-07-04 06:47:35.534948', '2023-07-04 06:47:35.534948', 'laudantium modi', 'Possimus hic officiis blanditiis magni fugit ipsum corporis. Aspernatur provident aspernatur nam. Suscipit neque maiores tempore quam consectetur accusantium officiis consectetur.', 'Hazel Bogan', 'Horror', '2023-06-10 11:21:30', 90, 8, 'Slovakia', 'ME', 'https://loremflickr.com/640/480?lock=7245457401053184', 1),
(6, '2023-07-04 06:47:35.536134', '2023-07-04 06:47:35.536134', 'adipisci veritatis', 'Nostrum accusamus doloremque voluptates nisi ab. Quam eligendi porro vero est dicta laborum deserunt distinctio voluptas. Dolores deleniti enim.', 'Dr. Gilbert O\'Keefe', 'Thriller', '2023-05-04 21:06:21', 130, 3, 'Guernsey', 'VI', 'https://loremflickr.com/640/480?lock=2296091884126208', 1),
(7, '2023-07-04 06:47:35.542682', '2023-07-04 06:47:35.542682', 'molestiae laudantium', 'Doloremque perferendis nisi porro libero. Nesciunt nobis minus recusandae occaecati aut debitis molestias occaecati. Aut sed vero nam maxime ut fugiat.', 'Stephanie Bradtke', 'Romance', '2022-09-30 07:02:40', 166, 6, 'Gambia', 'DK', 'https://loremflickr.com/640/480?lock=3481201606131712', 1),
(8, '2023-07-04 06:47:35.543647', '2023-07-04 06:47:35.543647', 'magnam inventore', 'Iusto animi aliquam pariatur delectus autem blanditiis incidunt. At nesciunt voluptatem exercitationem fugit enim. Nisi exercitationem ullam odio sint.', 'Tara Spinka', 'Romance', '2023-05-14 03:20:22', 179, 4, 'Trinidad and Tobago', 'LC', 'https://loremflickr.com/640/480?lock=4453908875313152', 1),
(9, '2023-07-04 06:47:35.545108', '2023-07-04 06:47:35.545108', 'beatae voluptatem', 'Minus odit sunt magni harum magni distinctio laborum officia. Dolorum voluptas reiciendis consequatur debitis dolore officia reiciendis perferendis. Quia aliquam exercitationem explicabo distinctio nemo quasi.', 'Olivia Watsica', 'Comedy', '2022-07-11 22:12:58', 126, 6, 'Costa Rica', 'NO', 'https://loremflickr.com/640/480?lock=5771280630415360', 1),
(10, '2023-07-04 06:47:35.546135', '2023-07-04 06:47:35.546135', 'nemo explicabo', 'Exercitationem est vero ex consectetur voluptatum veniam amet nemo iste. Iure in sapiente officiis minus. Qui magni porro voluptates sapiente vero sit totam.', 'Karla Quitzon-Bednar', 'Fantasy', '2022-07-09 13:13:36', 62, 0, 'Senegal', 'AL', 'https://loremflickr.com/640/480?lock=1369279951798272', 1),
(11, '2023-07-04 06:47:35.547033', '2023-07-04 06:47:35.547033', 'dolore expedita', 'Libero magni reprehenderit. Quo tempora officia corrupti id eaque saepe vel. Mollitia quis eveniet inventore distinctio sunt repellat.', 'Dr. Shane Pacocha', 'Drama', '2023-03-06 15:24:05', 161, 2, 'Nigeria', 'LC', 'https://loremflickr.com/640/480?lock=4742774437969920', 1),
(12, '2023-07-04 06:47:35.555564', '2023-07-04 06:47:35.555564', 'officia corporis', 'Libero voluptatum error quas ab magnam voluptatem rerum optio. Amet repellat ad animi. Esse officia recusandae.', 'Angelo Connelly', 'Adventure', '2022-10-19 02:18:36', 95, 7, 'Belize', 'NF', 'https://loremflickr.com/640/480?lock=460656490840064', 1),
(13, '2023-07-04 06:47:35.562070', '2023-07-04 06:47:35.562070', 'non sequi', 'Aspernatur atque a quod illum nemo. Atque ullam a. Aliquam libero magnam sed dicta accusamus dolorum voluptate dolores.', 'Mrs. Sandy Rippin', 'Mystery', '2023-05-23 22:54:20', 161, 4, 'Democratic Republic of the Congo', 'SB', 'https://loremflickr.com/640/480?lock=8523332542529536', 1),
(14, '2023-07-04 06:47:35.564619', '2023-07-04 06:47:35.564619', 'hic reprehenderit', 'Vel modi eius ipsa doloribus. Provident reprehenderit dolor aliquid fugiat consectetur. Magni maiores odit quas dolor saepe earum dolorem.', 'Dr. Ramiro Baumbach', 'Romance', '2022-12-24 03:15:24', 97, 4, 'Liechtenstein', 'PL', 'https://loremflickr.com/640/480?lock=7874160686530560', 1),
(15, '2023-07-04 06:47:35.565665', '2023-07-04 06:47:35.565665', 'iure maiores', 'Recusandae ad adipisci maxime. Labore recusandae officia iusto ducimus illo expedita quidem voluptates dicta. Modi facilis animi minima maiores molestiae fuga.', 'Eunice Schuster', 'Horror', '2023-03-14 17:17:22', 102, 4, 'Comoros', 'HR', 'https://loremflickr.com/640/480?lock=7622349438320640', 1),
(16, '2023-07-04 06:47:35.571542', '2023-07-04 06:47:35.571542', 'quibusdam tempore', 'Nihil alias quam culpa quod enim. Dignissimos quisquam facere dolores et iusto incidunt. Expedita aliquid aperiam natus sequi exercitationem nostrum cumque ex.', 'Tina Gerlach', 'Mystery', '2022-11-08 05:58:12', 102, 4, 'Montserrat', 'EH', 'https://loremflickr.com/640/480?lock=6426740391936000', 1),
(17, '2023-07-04 06:47:35.579968', '2023-07-04 06:47:35.579968', 'perspiciatis magnam', 'Eveniet eaque cum. Aut officiis odio voluptatibus ipsam delectus explicabo quod. Rerum doloremque praesentium totam repudiandae quaerat inventore.', 'Erica Dickens', 'Horror', '2023-01-30 11:09:22', 68, 9, 'Tokelau', 'HU', 'https://loremflickr.com/640/480?lock=3638147359440896', 1),
(18, '2023-07-04 06:47:35.581360', '2023-07-04 06:47:35.581360', 'nisi aspernatur', 'Sint aut nemo eveniet enim alias commodi enim. Aliquid quaerat ratione esse. Molestiae consequatur cumque accusamus.', 'Rudolph Mayer', 'Fantasy', '2023-02-05 05:07:33', 173, 9, 'Jordan', 'LY', 'https://loremflickr.com/640/480?lock=4235290652704768', 1),
(19, '2023-07-04 06:47:35.582424', '2023-07-04 06:47:35.582424', 'et excepturi', 'Vitae quas non aliquam pariatur numquam. Accusamus totam asperiores quaerat. Fugit amet illum.', 'Sean Grimes PhD', 'Action', '2022-10-13 07:04:06', 123, 0, 'Congo', 'BZ', 'https://loremflickr.com/640/480?lock=5492244322713600', 1),
(20, '2023-07-04 06:47:35.585980', '2023-07-04 06:47:35.585980', 'dolor natus', 'Veritatis fugiat nam placeat. Illo amet tempora quas voluptatibus aperiam. Alias distinctio in earum nihil voluptate ab aliquam.', 'Betty Muller', 'Romance', '2023-01-23 11:22:17', 70, 0, 'Montenegro', 'PK', 'https://loremflickr.com/640/480?lock=168652980617216', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `createdOn`, `updatedOn`, `name`, `status`) VALUES
(1, '2023-07-04 06:47:33.548745', '2023-07-04 06:47:33.548745', 'ADMINISTRATOR', 1),
(2, '2023-07-04 06:47:33.570677', '2023-07-04 06:47:33.570677', 'USER', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `firstName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `birthDate` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `lastLogin` datetime DEFAULT NULL,
  `profilePhoto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://avatars.githubusercontent.com/u/2693364',
  `roleId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `createdOn`, `updatedOn`, `firstName`, `lastName`, `email`, `password`, `birthDate`, `status`, `lastLogin`, `profilePhoto`, `roleId`) VALUES
(1, '2023-07-04 06:47:33.921966', '2023-07-04 06:47:33.921966', 'Elton', 'Sauer', 'Novella76@hotmail.com', '$2a$10$6UREqWpyk7vC7FFEurzaFeqQRID5K1pNQ6TdFOEfNKGiTjq7V7z4S', '1976-04-13 10:32:15', 1, NULL, 'https://avatars.githubusercontent.com/u/48260355', 2),
(2, '2023-07-04 06:47:34.073958', '2023-07-04 06:47:34.073958', 'Ismael', 'Blick', 'Jayme.Zulauf@gmail.com', '$2a$10$V0ilQOk986u7rm2hRnxI4Ol//QZYDG./kH.TJjjzQf0Iv9pxjjNVq', '1989-05-02 10:22:01', 1, NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/721.jpg', 2),
(3, '2023-07-04 06:47:34.076193', '2023-07-04 06:47:34.076193', 'Kimberly', 'Greenholt', 'Shakira_Becker88@yahoo.com', '$2a$10$MLR95KCYw4rY.Pw42X1WW.d1bKVPFXe55GLneKf0reC/jITUM5zW.', '1994-02-09 17:39:45', 1, NULL, 'https://avatars.githubusercontent.com/u/71088833', 2),
(4, '2023-07-04 06:47:34.327354', '2023-07-04 06:47:34.327354', 'Guy', 'Rohan', 'Isidro_Bergstrom@gmail.com', '$2a$10$hCO6fYfOCCVqNapXSLheS.Tb204ZhHU5on.osWoqiySL41jU.Wdou', '2005-10-20 17:41:43', 1, NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/540.jpg', 2),
(5, '2023-07-04 06:47:34.479437', '2023-07-04 06:47:34.479437', 'Alexandre', 'Yost', 'Millie31@yahoo.com', '$2a$10$MW2xu8kfJi3tZXToS3K9EuD.q0GVwF3x1DMwkWGeYL/zda9yxAWjO', '1970-12-26 00:27:37', 1, NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/273.jpg', 2),
(6, '2023-07-04 06:47:34.565009', '2023-07-04 06:47:34.565009', 'Loyal', 'Sawayn', 'Newton.Zboncak-Nitzsche62@gmail.com', '$2a$10$bWR6ugyrXS3nKCaeL2MfwOegqyspQVbMepRm3zU0QSCPQPOG3tFxu', '1967-05-29 00:39:11', 1, NULL, 'https://avatars.githubusercontent.com/u/75311380', 2),
(7, '2023-07-04 06:47:34.749053', '2023-07-04 06:47:34.749053', 'Ernestina', 'Williamson', 'Erika.Hamill@yahoo.com', '$2a$10$3E3BD5CbvSQKujLo/O.pk.IDfJUcLLrA6IP6cvSYtRYEoLvg8n99O', '1984-09-01 10:19:04', 1, NULL, 'https://avatars.githubusercontent.com/u/44403000', 2),
(8, '2023-07-04 06:47:34.968096', '2023-07-04 06:47:34.968096', 'Savannah', 'Johnson', 'Jailyn21@yahoo.com', '$2a$10$t.m2pRztypikg26ybZBwFevIigAmWGOeqw3pL4nrqKr0SSkzFt3Pu', '1966-12-29 13:07:11', 1, NULL, 'https://avatars.githubusercontent.com/u/92677484', 2),
(9, '2023-07-04 06:47:35.223324', '2023-07-04 06:47:35.223324', 'Susan', 'Swift', 'Beaulah.Cremin55@hotmail.com', '$2a$10$LwneUwvaem4NQXJeNsXRvelF.a./2ISB3tBc9Ei7iD8Z1KNZ6s4g2', '1960-07-01 09:42:25', 1, NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/117.jpg', 2),
(10, '2023-07-04 06:47:35.276427', '2023-07-04 06:47:35.276427', 'Antone', 'Dooley', 'Claire_Beatty43@yahoo.com', '$2a$10$PNXY3UcehnXJcn.f/5GAG.XN9esyQIw1Joil4PeLuB.hI1dBEaZ2y', '1987-08-09 01:53:25', 1, NULL, 'https://avatars.githubusercontent.com/u/86265065', 2),
(11, '2023-07-04 06:47:35.447885', '2023-07-04 06:47:48.000000', 'User', 'Admin', 'example@example.com', '$2a$10$OF9.wdqTLT8pbjS3TRgqZu6b0c4Fe5G6N.J45sxpBq5jaHU9wyX6S', '2023-07-04 06:47:35', 1, '2023-07-04 06:47:48', 'https://avatars.githubusercontent.com/u/11910200', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `liked_movie`
--
ALTER TABLE `liked_movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5847f1da617807fb1a0c5d09192` (`movieId`),
  ADD KEY `FK_5685808f35288dc1d061e7be7ab` (`userId`);

--
-- Indices de la tabla `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `liked_movie`
--
ALTER TABLE `liked_movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `liked_movie`
--
ALTER TABLE `liked_movie`
  ADD CONSTRAINT `FK_5685808f35288dc1d061e7be7ab` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_5847f1da617807fb1a0c5d09192` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
