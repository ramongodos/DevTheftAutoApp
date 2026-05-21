INSERT INTO genero (id, nombre, descripcion) VALUES
(1, 'Acción', 'Juegos de combate rápido y reflejos'),
(2, 'RPG', 'Juegos de rol con progresión de personaje'),
(3, 'Estrategia', 'Juegos de planificación y táctica'),
(4, 'Aventura', 'Exploración e historia narrativa'),
(5, 'Terror', 'Juegos de horror y supervivencia');

-- Datos iniciales para Videojuego
INSERT INTO videojuego (id, titulo, desarrollador, anio, precio, disponible, genero_id, plataforma, calificacion, imagen, descripcion) VALUES
(1, 'Elden Ring', 'FromSoftware', 2022, 59.99, true, 2, 'PC / PS5 / Xbox', 9.5, 'https://placehold.co/400x240/7c3aed/ffffff?text=Elden+Ring', 'RPG de acción en mundo abierto por FromSoftware. Explora las Tierras Intermedias y sus innumerables secretos ocultos.'),
(2, 'Hades', 'Supergiant Games', 2020, 24.99, true, 1, 'PC / Nintendo Switch', 9.3, 'https://placehold.co/400x240/dc2626/ffffff?text=Hades', 'Roguelike de acción donde encarnas a Zagreus, hijo del dios del inframundo, en su épica fuga del Olimpo.'),
(3, 'Civilization VI', 'Firaxis', 2016, 29.99, true, 3, 'PC / iOS / Android', 8.7, 'https://placehold.co/400x240/f59e0b/000000?text=Civilization+VI', 'Construye y lidera una civilización desde la prehistoria hasta la era espacial en este referente de la estrategia por turnos.'),
(4, 'Death Stranding', 'Kojima Productions', 2019, 39.99, true, 4, 'PC / PS4 / PS5', 8.3, 'https://placehold.co/400x240/166534/ffffff?text=Death+Stranding', 'Conecta ciudades y reconstruye América en un mundo post-apocalíptico en esta obra única de Hideo Kojima.'),
(5, 'Resident Evil 4', 'Capcom', 2023, 49.99, true, 5, 'PC / PS5 / Xbox', 9.3, 'https://placehold.co/400x240/1e293b/f87171?text=Resident+Evil+4', 'Reimaginación del clásico survival horror donde Leon S. Kennedy rescata a la hija del presidente de una aldea infectada.'),
(6, 'God of War', 'Santa Monica Studio', 2018, 29.99, true, 1, 'PC / PS4 / PS5', 9.6, 'https://placehold.co/400x240/dc2626/ffffff?text=God+of+War', 'Kratos y su hijo Atreus se adentran en la mitología nórdica en una aventura épica llena de combate brutal e historia emocionante.'),
(7, 'The Witcher 3', 'CD Projekt RED', 2015, 19.99, true, 2, 'PC / PS4 / PS5 / Xbox / Switch', 9.8, 'https://placehold.co/400x240/581c87/ffffff?text=The+Witcher+3', 'Geralt de Rivia recorre un mundo abierto plagado de monstruos y decisiones morales en busca de su hija adoptiva Ciri.'),
(8, 'Hollow Knight', 'Team Cherry', 2017, 14.99, true, 1, 'PC / Nintendo Switch / PS4 / Xbox', 9.1, 'https://placehold.co/400x240/1e1e36/a78bfa?text=Hollow+Knight', 'Metroidvania de exploración en un vasto reino subterráneo de insectos, con desafiante combate y mundo lleno de misterio.');