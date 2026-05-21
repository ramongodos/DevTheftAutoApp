package devtheftauto.devtheftauto.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import devtheftauto.devtheftauto.model.Genero;
import devtheftauto.devtheftauto.model.Videojuego;
import devtheftauto.devtheftauto.repository.GeneroRepository;
import devtheftauto.devtheftauto.repository.VideojuegoRepository;


/**
 * Capa de Servicio (Servidor) para la gestión de Videojuegos.
 * Centraliza las reglas de negocio del catálogo de juegos.
 */
@Service
@RequiredArgsConstructor // Inyecta de forma automática el repositorio mediante constructor
public class VideojuegoService {

    private final VideojuegoRepository videojuegoRepository;
    private final GeneroRepository generoRepository;

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
     * Carga el Genero completo desde la BD para evitar errores de entidad desvinculada.
     */
    public Videojuego create(Videojuego videojuego) {
        resolverGenero(videojuego);
        return videojuegoRepository.save(videojuego);
    }
    
    /**
     * Lógica de actualización (PUT).
     */
    public Videojuego update(Long id, Videojuego v) {
        if (videojuegoRepository.existsById(id)) {
            resolverGenero(v);
            v.setId(id);
            return videojuegoRepository.save(v);
        }
        return null;
    }
    
    /**
     * Lógica para eliminar un videojuego.
     */
    public void delete(Long id) {
        videojuegoRepository.deleteById(id);
    }

    /** Carga el Genero completo a partir del ID recibido desde el cliente. */
    private void resolverGenero(Videojuego v) {
        if (v.getGenero() != null && v.getGenero().getId() != null) {
            generoRepository.findById(v.getGenero().getId()).ifPresent(v::setGenero);
        }
    }
}

