package devtheftauto.devtheftauto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import devtheftauto.devtheftauto.model.Genero;

/**
 * Interfaz de Repositorio para la entidad Genero (Padre).
 * Al extender de JpaRepository, Spring Data JPA genera en tiempo de ejecución
 * toda la infraestructura necesaria para hacer el CRUD sobre la tabla 'genero'.
 * * Pasamos <Genero, Long> indicando:
 * 1. La clase de la entidad que va a manejar (Genero).
 * 2. El tipo de datos que tiene su clave primaria o ID (Long).
 */
@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {
    // No hace falta escribir ningún método manual aquí.
    // JpaRepository ya nos regala: save(), findById(), findAll(), deleteById(), etc.
}
