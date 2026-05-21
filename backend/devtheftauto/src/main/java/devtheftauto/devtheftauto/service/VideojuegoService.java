package devtheftauto.devtheftauto.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import devtheftauto.devtheftauto.model.Videojuego;
import devtheftauto.devtheftauto.repository.VideojuegoRepository;


/**
 * Capa de Servicio (Servidor) para la gestión de Videojuegos.
 * Centraliza las reglas de negocio del catálogo de juegos.
 */
@Service
@RequiredArgsConstructor // Inyecta de forma automática el repositorio mediante constructor
public class VideojuegoService {

    // Conexión directa con la persistencia de datos de videojuegos
    private final VideojuegoRepository videojuegoRepository;

    /**
     * Recupera la lista completa de videojuegos existentes en el catálogo.
     */
    public List<Videojuego> getAll() {
        return videojuegoRepository.findAll();
    }

    /**
     * Recupera un videojuego específico buscando por su identificador único (ID).
     */
    public Videojuego getById(Long id) {
        return videojuegoRepository.findById(id).orElse(null);
    }

    /**
     * Almacena un nuevo videojuego en el sistema.
     * El objeto recibido ya incluye internamente la asociación al ID del género padre.
     */
    public Videojuego create(Videojuego videojuego) {
        return videojuegoRepository.save(videojuego);
    }
    
    /**
     * Lógica de actualización (PUT).
     * Control de seguridad: Primero comprueba si el videojuego realmente existe en la BD.
     * Si existe, le asigna el ID correspondiente para asegurar que se edite ese registro y no se cree uno nuevo.
     */
    public Videojuego update(Long id, Videojuego v) {
        if (videojuegoRepository.existsById(id)) {
            v.setId(id); // Vincula obligatoriamente el ID de la URL al objeto modificado
            return videojuegoRepository.save(v); // Al llevar ID, .save() actúa como un UPDATE de SQL
        }
        return null; // Si no existía el juego, no hace nada y devuelve null
    }
    
    /**
     * Lógica para eliminar un videojuego.
     * Envía la orden directa al repositorio para borrar la fila correspondiente en la tabla H2.
     */
    public void delete(Long id) {
        videojuegoRepository.deleteById(id);
    }
}

