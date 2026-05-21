INSERT INTO genero (id, nombre, descripcion) VALUES
(1, 'Acción', 'Juegos de combate rápido y reflejos'),
(2, 'RPG', 'Juegos de rol con progresión de personaje'),
(3, 'Estrategia', 'Juegos de planificación y táctica'),
(4, 'Aventura', 'Exploración e historia narrativa'),
(5, 'Terror', 'Juegos de horror y supervivencia');

-- Datos iniciales para Videojuego
INSERT INTO videojuego (id, titulo, desarrollador, anio, precio, disponible, genero_id) VALUES
(1, 'Elden Ring', 'FromSoftware', 2022, 59.99, true, 2),
(2, 'Hades', 'Supergiant Games', 2020, 24.99, true, 1),
(3, 'Civilization VI', 'Firaxis', 2016, 29.99, true, 3),
(4, 'Death Stranding', 'Kojima Productions', 2019, 39.99, true, 4),
(5, 'Resident Evil 4', 'Capcom', 2023, 49.99, true, 5),
(6, 'God of War', 'Santa Monica', 2018, 29.99, true, 1),
(7, 'The Witcher 3', 'CD Projekt', 2015, 19.99, true, 2),
(8, 'Hollow Knight', 'Team Cherry', 2017, 14.99, true, 1);