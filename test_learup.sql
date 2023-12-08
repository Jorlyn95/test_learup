-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.1.9
-- Generation Time: Dec 08, 2023 at 04:23 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_learup`
--
CREATE DATABASE IF NOT EXISTS `test_learup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE `test_learup`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `change_boss` (IN `nuevo_jefe` INT, IN `empleado` INT)   BEGIN

    DECLARE old_value INT;
	
    SET old_value = (SELECT Jefe FROM empleado WHERE id = empleado);
    
	UPDATE empleado 
    SET Jefe = nuevo_jefe
    WHERE id = empleado;
    
    INSERT INTO historial_empleados VALUES (null, empleado, NOW(), old_value, nuevo_jefe);
	    
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_boss` (IN `nombre` VARCHAR(100), IN `apellido` VARCHAR(100), IN `cargo` VARCHAR(100))   BEGIN
	
    INSERT INTO Jefes values(null, nombre, apellido, cargo, now(), null, 1);
	SELECT MAX(id)
    FROM Jefes;

END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_employer` (IN `nombre` VARCHAR(100), IN `apellido` VARCHAR(100), IN `cedula` VARCHAR(100), IN `jefe` INT)   BEGIN
	DECLARE idEmpleado INT;
    
    INSERT INTO empleado values(null, nombre, apellido, cedula, jefe, now(), now());
        
    SET idEmpleado = (SELECT MAX(Id) FROM empleado);
    
    call change_boss(jefe, idEmpleado);
    SELECT idEmpleado;

END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_employers` ()   BEGIN
	
    SELECT e.Id, e.Nombre, e.Apellido, e.Cedula,
    concat(j.Nombre, " ", j.Apellido) as Jefe,
    j.Id id_jefe,
    e.Fecha_Registro, e.Fecha_Actualizacion
    FROM empleado e INNER JOIN Jefes j on 
    e.Jefe=j.Id;

END$$

CREATE DEFINER=`root`@`%` PROCEDURE `list_changes` (IN `id_employer` INT)   BEGIN
	
    SELECT he.id, he.fecha, concat(e.Nombre, " ", e.Apellido) Empleado,
    e.Cedula, concat(j.Nombre, " ", j.Apellido) as JefeAnterior,
    concat(j2.Nombre, " ", j2.Apellido) as NuevoJefe
    FROM historial_empleados he 
    INNER JOIN Jefes j ON he.jefe_anterior=j.Id
    INNER JOIN Jefes j2 on he.nuevo_jefe=j2.Id
    INNER JOIN empleado e on he.empleado=e.Id
    WHERE e.Id=id_employer;

END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_boss` (IN `nombre` VARCHAR(100), IN `apellido` VARCHAR(100), IN `cargo` VARCHAR(100), IN `id_jefe` INT)   BEGIN
    UPDATE Jefes
    SET Nombre = nombre, Apellido = apellido, Cargo = cargo
    WHERE Id = id_jefe;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_employer` (IN `nombre` VARCHAR(100), IN `apellido` VARCHAR(100), IN `cedula` VARCHAR(100), IN `id_empleado` INT)   BEGIN
	
    UPDATE empleado
    SET nombre=nombre, apellido=apellido, cedula=cedula
    where id=id_empleado;
    
    SELECT "Ok";

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `Id` int NOT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Apellido` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Cedula` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Jefe` int DEFAULT NULL,
  `Fecha_Registro` datetime DEFAULT NULL,
  `Fecha_Actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historial_empleados`
--

CREATE TABLE `historial_empleados` (
  `id` int NOT NULL,
  `empleado` int NOT NULL,
  `fecha` datetime NOT NULL,
  `jefe_anterior` int NOT NULL,
  `nuevo_jefe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Jefes`
--

CREATE TABLE `Jefes` (
  `Id` int NOT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Apellido` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Cargo` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `Fecha_Ingreso` datetime DEFAULT NULL,
  `Fecha_Salida` datetime DEFAULT NULL,
  `Status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Jefes`
--

INSERT INTO `Jefes` (`Id`, `Nombre`, `Apellido`, `Cargo`, `Fecha_Ingreso`, `Fecha_Salida`, `Status`) VALUES
(1, 'N/a', '', '', '2023-12-08 04:23:08', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Status_Jefes`
--

CREATE TABLE `Status_Jefes` (
  `Id` int NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Status_Jefes`
--

INSERT INTO `Status_Jefes` (`Id`, `Status`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `historial_empleados`
--
ALTER TABLE `historial_empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Jefes`
--
ALTER TABLE `Jefes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Status_Jefes`
--
ALTER TABLE `Status_Jefes`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historial_empleados`
--
ALTER TABLE `historial_empleados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Jefes`
--
ALTER TABLE `Jefes`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Status_Jefes`
--
ALTER TABLE `Status_Jefes`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
