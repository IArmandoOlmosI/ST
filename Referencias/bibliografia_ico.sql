DROP DATABASE IF EXISTS bibliografia_ico;
CREATE DATABASE IF NOT EXISTS bibliografia_ico;
USE bibliografia_ico;

CREATE TABLE tipos_fuente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE fuentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_id INT NOT NULL,
    titulo TEXT NOT NULL,
    editorial VARCHAR(255) NULL,
    anio YEAR NULL,
    lugar VARCHAR(100) NULL,
    url TEXT,
    FOREIGN KEY (tipo_id) REFERENCES tipos_fuente(id)
);

CREATE TABLE autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL
);

CREATE TABLE autor_fuente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    autor_id INT NOT NULL,
    fuente_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(id),
    FOREIGN KEY (fuente_id) REFERENCES fuentes(id)
);

CREATE TABLE asignaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    semestre INT
);

CREATE TABLE fuente_asignatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fuente_id INT NOT NULL,
    asignatura_id INT NOT NULL,
    FOREIGN KEY (fuente_id) REFERENCES fuentes(id),
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id)
);

CREATE TABLE administrador (
	id_administrador int AUTO_INCREMENT PRIMARY KEY,
	usuario VARCHAR(255) NOT NULL,
	contrasena VARCHAR(255) NOT NULL
);

INSERT INTO tipos_fuente VALUES (1,'Libros'),(2,'Fuentes electronicas'),(3,'Articulos');

INSERT INTO administrador VALUES (1,'admin','admin123'),(2,'ico','ico123');

INSERT INTO asignaturas VALUES (1,'Álgebra',1),(2,'Cálculo Diferencial e Integral',1),(3,'Computadoras y Programación',1),(4,'Geometría Analítica',1),(5,'Introducción a la Ingeniería en Computación',1),(6,'Álgebra Lineal',2),(7,'Cálculo Vectorial',2),(8,'Comunicación',2),(9,'Emprendimiento 1',2),(10,'Programación Orientada a Objetos',2),(11,'Taller de creatividad e innovación',2),(12,'Ecuaciones Diferenciales',3),(13,'Electricidad y Magnetismo (L)',3),(14,'Emprendimiento 2',3),(15,'Estructura de Datos',3),(16,'Métodos Numéricos',3),(17,'Bases de Datos 1',4),(18,'Dispositivos Electrónicos (L)',4),(19,'Emprendimiento 3',4),(20,'Matemáticas Discretas',4),(21,'Probabilidad y Estadística',4),(22,'Administración de Proyectos',5),(23,'Diseño Lógico (L)',5),(24,'Diseño y Análisis de Algoritmos',5),(25,'Lenguajes Formales y Autómatas',5),(26,'Programación Web 1',5),(27,'Compiladores',6),(28,'Diseño de Sistemas Digitales (L)',6),(29,'Ingeniería de Software',6),(30,'Sistemas Operativos',6),(31,'Microprocesadores y Microcontroladores (L)',7),(32,'Programación Web 2',7),(33,'Redes de computadoras 1 (L)',7),(34,'Sistemas de Información',7),(35,'Bases de Datos 2',8),(36,'Habilidades Directivas',8),(37,'Programación Móvil 1',8),(38,'Redes de Computadoras 2',8),(39,'Inteligencia Artificial',9),(40,'Minería de Datos',9),(41,'Seguridad Informática',9);

INSERT INTO autores VALUES (1,'Cárdenas, T. H.'),(2,'Emmer, M.'),(3,'Lax, P.'),(4,'Mena, B.'),(5,'Méndez, A.'),(6,'Péñaloza, R. E.'),(7,'Gigena, S.'),(8,'Gindikin, S.'),(9,'Harris, C.'),(10,'Adobe'),(11,'Antón, H.'),(12,'Dauben, J.'),(13,'Escriba, C. J.'),(14,'George, B. T.'),(15,'Marsden, J.'),(16,'Fonseca, Y. S.'),(17,'González, R. S.'),(18,'Araujo, A. D.'),(19,'Hernández, O. M.'),(20,'Ceballos, S. F.'),(21,'Horton, I.'),(22,'Fingermann, G.'),(23,'Osterwald, A.'),(24,'Debnath, L.'),(25,'Zill, D.'),(26,'Giraldo, E.'),(27,'Sears, F.'),(28,'Motta, M.'),(29,'Pappas, J. L.'),(30,'Aho, A.'),(31,'Savitch, W.'),(32,'Carrasco, V. L.'),(33,'Mora, W. F.'),(34,'Korth, H.'),(35,'MariaDB'),(36,'Markus, J.'),(37,'Roldan, A. J.'),(38,'Arya, J.'),(39,'Hinojosa, J.'),(40,'Kleiman, A.'),(41,'Lipchutz, S.'),(42,'Larson, H.'),(43,'Montgomery, D.'),(44,'Meredith, J.'),(45,'Project Management Institute'),(46,'Mano, M.'),(47,'Millman, J.'),(48,'Silberschatz, A.'),(49,'W3Schools'),(50,'IETF'),(51,'Rex, H.'),(52,'Puchol, L.'),(53,'Russell, S.'),(54,'Russell, M.'),(55,'Rossell S.'),(56,'Russell S.');

INSERT INTO fuentes VALUES (1,1,'Algebra Superior','Editorial Trillas',2014,'México',''),(2,1,'Imagine Math. Between Culture and Mathematics','Springer',2012,'Italia',''),(3,1,'Calculus with Applications','Springer',2014,'New York',''),(4,1,'Introduccion al Cálculo Vectorial','Thomson',2003,'México',''),(5,1,'Diseño de algoritmos y su programación en C','Alfaomega',2013,'México',''),(6,1,'Fundamentos de programación','UNAM ENEP Aragón',2004,'México',NULL),(7,1,'Álgebra y geometría: teoría, práctica y aplicaciones','Universitas Editorial Cientifica Universitaria',2018,'Argentina',''),(8,1,'Tales of Mathematicians and Physicists','Springer',2007,'New York',''),(9,1,'Engineering Ethics: Concepts and Cases','Wadsworth Publishing',2014,'USA',''),(10,2,'Documentación de Photoshop',NULL,2017,NULL,'https://helpx.adobe.com/support/photoshop.html'),(11,1,'Introducción al Álgebra Lineal','Limusa',2003,'México',''),(12,1,'Writing the History of Mathematics: Its Historical Development','Birkhäuser',2002,'Alemania',''),(13,1,'Cálculo varias variables','Pearson Education',2015,'México',''),(14,1,'Cálculo Vectorial','Pearson Education (Prentice Hall)',2005,'México',''),(15,1,'Comunicación oral y escrita','Pearson',2016,'México',''),(16,1,'Manual de redacción e investigación documental','Trillas',2005,'México',''),(17,1,'Presupuestos empresariales. Eje de la planeación financiera','Trillas',2012,'México',''),(18,1,'Administración de empresas','Piramide',2014,'España',''),(19,1,'Java 2 Curso de Programación','Alfaomega Ra-Ma',2000,'México',''),(20,1,'Beginning Java','John Wiley',2011,'USA',''),(21,1,'Relaciones humanas, fundamentos psicológicos y sociales','Editorial el ateneo',1992,'México',''),(22,1,'Generación de modelos de negocios','Wiley',2010,'New Jersey',''),(23,1,'Nonlinear partial differential equations','Birlchauser',2013,'USA',''),(24,1,'Ecuaciones diferenciales con aplicaciones de modelado','Thompson',2006,'México',''),(25,1,'Fundamentos de electricidad y magnetismo','Fondo Editorial EIA',2015,'Colombia',''),(26,1,'Física Universitaria','Addison-Wesley',2008,'México',''),(27,1,'Política de competencia: teoría y práctica','Fondo de Cultura Económica',2018,'Ciudad de México',''),(28,1,'Fundamentos de economía y administración','McGraw-Hill',1993,'México',''),(29,1,'Compiladores: principios, técnicas y herramientas','Addison Wesley',2008,'México',''),(30,1,'Absolute Java','Addison-Wesley',2010,'México',''),(31,1,'Métodos numéricos','Macro',2011,'Lima, Perú',''),(32,1,'Introducción a los Métodos Numéricos','Escuela de Matemáticas',2016,'Costa Rica',''),(33,1,'Fundamentos de Bases de Datos','McGraw-Hill',2014,'España',''),(34,2,'Manuales de MariaDB',NULL,2017,NULL,'https://mariadb.com/kb/en/documentation/'),(35,1,'Manual De Circuitos Electrónicos','Marcombo',1987,'México',''),(36,1,'Dispositivos electrónicos, problemas resueltos','Alfaomega',2001,'México',''),(37,1,'Matemáticas aplicadas a la administración y a la economía','Pearson',2002,'México',''),(38,1,'Evaluación económico-financiera de proyectos de inversión','Trillas',2011,'México',''),(39,1,'Aplicaciones matemáticas a la administración','Limusa',1972,'México',''),(40,1,'Teoría de conjuntos y temas afines','Mc Graw-Hill',1973,'Colombia',NULL),(41,1,'Introduction to probability theory and statistical inference','John Wiley & Sons',1989,'Canada',''),(42,1,'Applied statistics and probability for engineers','John Wiley & Sons',2003,'USA',NULL),(44,1,'Diseño Digital','Pearson',2018,'México',NULL),(45,1,'Microelectronics','McGraw-Hill',2001,'USA',''),(46,1,'Sistemas Operativos','Limusa',2002,'México',''),(47,2,'JavaScript Tutorial',NULL,2017,NULL,'https://www.w3schools.com/jS/default.asp'),(48,2,'Especificaciones de RFC para redes',NULL,2020,NULL,'https://www.ietf.org/standards/rfcs/'),(49,1,'Inteligencia Artificial: Un enfoque moderno','Prentice Hall Hispanoamericano',1996,'México',''),(50,1,'El libro de las Habilidades Directivas','Díaz de Santos',2010,'España',''),(52,1,'Mining the social web ','O\'Reilly',2011,'USA','');

INSERT INTO autor_fuente VALUES (6,6,6),(41,41,40),(43,43,42),(46,46,44),(50,50,48),(58,1,1),(59,2,2),(60,3,3),(61,4,4),(62,5,5),(63,7,7),(64,8,8),(65,9,9),(66,10,10),(67,11,11),(68,12,12),(69,13,12),(70,14,13),(71,15,14),(72,16,15),(73,17,16),(74,18,17),(75,19,18),(76,20,19),(77,21,20),(78,22,21),(79,23,22),(80,24,23),(81,25,24),(82,26,25),(83,27,26),(84,28,27),(85,29,28),(86,30,29),(87,31,30),(88,32,31),(89,33,32),(90,34,33),(91,35,34),(92,36,35),(93,37,36),(94,38,37),(95,39,38),(96,40,39),(97,42,41),(98,47,45),(99,48,46),(100,49,47),(103,52,50),(106,56,49),(107,54,52);

INSERT INTO fuente_asignatura VALUES (3,6,3),(21,40,20),(23,42,21),(25,44,23),(30,48,33),(37,1,1),(38,2,1),(39,3,2),(40,4,2),(41,5,3),(42,7,4),(43,8,4),(44,9,5),(45,10,5),(46,11,6),(47,12,4),(48,13,7),(49,14,7),(50,15,8),(51,16,8),(52,17,9),(53,18,9),(54,19,10),(55,20,10),(56,21,11),(57,22,11),(58,23,12),(59,24,12),(60,25,13),(61,26,13),(62,27,14),(63,28,14),(64,29,27),(65,30,15),(66,31,16),(67,32,16),(68,33,17),(69,34,17),(70,35,18),(71,36,18),(72,37,19),(73,38,19),(74,39,20),(75,41,21),(76,45,18),(77,46,30),(78,47,32),(81,50,36),(84,49,39),(85,52,40);


