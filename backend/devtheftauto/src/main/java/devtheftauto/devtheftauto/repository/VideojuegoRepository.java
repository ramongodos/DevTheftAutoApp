package devtheftauto.devtheftauto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import devtheftauto.devtheftauto.model.Videojuego;  

/**
 * Interfaz de Repositorio para la entidad Videojuego (Hija).
 * Gestiona el almacenamiento, recuperación, actualización y borrado de las filas
 * pertenecientes a los videojuegos en la base de datos relacional H2.
 * * Pasamos <Videojuego, Long> indicando que maneja la entidad Videojuego
 * y su ID único es de tipo Long.
 */
@Repository
public interface VideojuegoRepository extends JpaRepository<Videojuego, Long> {
    // Al igual que el padre, hereda de forma automática todas las funciones de acceso a datos.
}

