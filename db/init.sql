CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` CHAR(36),
  `nombre` VARCHAR(64) NOT NULL,
  `apellido` VARCHAR(64) NOT NULL,
  `calle` VARCHAR(64) NULL,
  `numero` VARCHAR(64) NULL,
  `piso` VARCHAR(64) NULL,
  `tel` INT NOT NULL,
  `delivery` TINYINT NOT NULL,
  `json_products` JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS `consultas` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` CHAR(36),
  `nombre` VARCHAR(64) NOT NULL,
  `apellido` VARCHAR(64) NOT NULL,
  `mail` VARCHAR(64) NOT NULL,
  `motivo` VARCHAR(64) NOT NULL,
  `mensaje` VARCHAR(2048) NOT NULL
);
