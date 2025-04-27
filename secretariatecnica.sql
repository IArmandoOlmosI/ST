DROP DATABASE IF EXISTS secretariaTecnica;
CREATE DATABASE secretariaTecnica;
USE secretariaTecnica;


-- Catálogo de Categorías Docentes
CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(10) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    UNIQUE(clave)
);

-- Catálogo de Grados Académicos
CREATE TABLE grados_academicos (
    id_grado INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    UNIQUE(clave)
);

-- Tabla de Usuarios simplificada
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL COMMENT 'Almacenada en texto plano',
    es_admin BOOLEAN DEFAULT FALSE COMMENT 'TRUE para administrador, FALSE para solo lectura'
);

-- Tabla Principal de Trabajadores
CREATE TABLE trabajadores (
    id_trabajador INT PRIMARY KEY AUTO_INCREMENT,
    numero_trabajador VARCHAR(20) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    genero CHAR(1) COMMENT 'M: Masculino, F: Femenino, O: Otro',
    rfc VARCHAR(13) UNIQUE,
    curp VARCHAR(18) UNIQUE,
    id_categoria INT,
    id_grado INT,
    antiguedad_unam INT COMMENT 'Años en la UNAM',
    antiguedad_carrera INT COMMENT 'Años en la carrera',
    email_institucional VARCHAR(100) UNIQUE,
    telefono_casa VARCHAR(15),
    telefono_celular VARCHAR(15),
    direccion TEXT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_grado) REFERENCES grados_academicos(id_grado)
);


-- Usuario administrador (contraseña: admin123)
INSERT INTO usuarios (username, password, es_admin) VALUES
('admin', 'admin123', TRUE);

-- Usuario de solo lectura (contraseña: vista123)
INSERT INTO usuarios (username, password, es_admin) VALUES
('consulta', 'vista123', FALSE);

-- Insertar categorías docentes
INSERT INTO categorias (clave, nombre, descripcion) VALUES
('1.1', 'Profesor interino de asignatura A', ''),
('1.2', 'Profesor definitivo de asignatura A', ''),
('1.3', 'Profesor definitivo de asignatura B', ''),
('1.4', 'Profesor de tiempo completo', '');

-- Insertar grados académicos
INSERT INTO grados_academicos (clave, nombre, nivel) VALUES
('2.1', 'Licenciatura', 'Licenciatura'),
('2.2', 'Maestría', 'Posgrado'),
('2.3', 'Doctorado', 'Posgrado'),
('2.4', 'Posdoctorado', 'Posgrado');



-- Insertar 10 trabajadores de ejemplo
INSERT INTO trabajadores (numero_trabajador, nombre_completo, genero, rfc, curp, id_categoria, id_grado, antiguedad_unam, antiguedad_carrera, email_institucional, telefono_casa, telefono_celular, direccion) VALUES
('TRAB001', 'María Guadalupe Hernández López', 'F', 'HELM850101ABC', 'HELM850101MDFRPD01', 1, 1, 5, 10, 'mghernandez@unam.mx', '5555123456', '5555987654', 'Av. Universidad 300, CDMX'),
('TRAB002', 'Juan Carlos Pérez García', 'M', 'PEGJ750202DEF', 'PEGJ750202HDFRRN02', 2, 2, 15, 20, 'jcperez@unam.mx', '5555234567', '5555876543', 'Insurgentes Sur 2000, CDMX'),
('TRAB003', 'Ana Patricia Sánchez Martínez', 'F', 'SAMA800303GHI', 'SAMA800303MDFNTN03', 3, 3, 8, 12, 'apsanchez@unam.mx', '5555345678', '5555765432', 'Coyoacán 45, CDMX'),
('TRAB004', 'Luis Fernando Ramírez Díaz', 'M', 'RADL820404JKL', 'RADL820404HDFMZS04', 4, 4, 6, 9, 'lframirez@unam.mx', '5555456789', '5555654321', 'Pedregal 120, CDMX'),
('TRAB005', 'Sofía Alejandra Castro Ruiz', 'F', 'CARS900505MNO', 'CARS900505MDFRJT05', 1, 2, 3, 5, 'sacastro@unam.mx', '5555567890', '5555543210', 'San Ángel 78, CDMX'),
('TRAB006', 'Roberto Antonio Mendoza Vega', 'M', 'MEVR770606PQR', 'MEVR770606HDFNGB06', 2, 3, 18, 22, 'ramendoza@unam.mx', '5555678901', '5555432109', 'Tlalpan 1500, CDMX'),
('TRAB007', 'Laura Gabriela Ortega Silva', 'F', 'OESL830707STU', 'OESL830707MDFRVL07', 3, 1, 7, 11, 'lgortega@unam.mx', '5555789012', '5555321098', 'Xochimilco 90, CDMX'),
('TRAB008', 'José Manuel Torres Reyes', 'M', 'TORJ880808VWX', 'TORJ880808HDFRYS08', 4, 2, 4, 7, 'jmtorres@unam.mx', '5555890123', '5555210987', 'Mixcoac 34, CDMX'),
('TRAB009', 'Claudia Isabel Navarro Jiménez', 'F', 'NAJC910909YZA', 'NAJC910909MDFRMV09', 1, 3, 2, 4, 'cinavarro@unam.mx', '5555901234', '5555109876', 'Del Valle 56, CDMX'),
('TRAB010', 'Francisco Javier Domínguez Luna', 'M', 'DOLF720010BCD', 'DOLF720010HDFRNN10', 2, 4, 25, 30, 'fjdominguez@unam.mx', '5555012345', '5555098765', 'Roma Norte 67, CDMX');