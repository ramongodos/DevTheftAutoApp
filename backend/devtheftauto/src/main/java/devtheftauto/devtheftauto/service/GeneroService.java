package devtheftauto.devtheftauto.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import devtheftauto.devtheftauto.model.Videojuego;

import devtheftauto.devtheftauto.model.Genero;
import devtheftauto.devtheftauto.repository.GeneroRepository;

/**
 * Capa de Servicio (Servidor) para la gestión de Géneros.
 * Aquí se aplica la lógica de negocio antes de enviar los datos al controlador.
 */
@Service
@RequiredArgsConstructor // Lombok genera automáticamente el constructor para inyectar el repositorio
public class GeneroService {

    // Inyección de dependencia del repositorio de géneros para acceder a la BD
    private final GeneroRepository generoRepository;

    /**
     * Lógica para obtener todos los géneros.
     * Llama al repositorio para traer la lista completa desde la base de datos H2.
     */
    public List<Genero> getAll() {
        return generoRepository.findAll();
    }

    /**
     * Lógica para obtener un género por su ID.
     * Utiliza .orElse(null) para que, si el ID no existe en la BD, devuelva un objeto vacío (null) de forma segura.
     */
    public Genero getById(Long id) {
        return generoRepository.findById(id).orElse(null);
    }

    /**
     * Lógica para registrar un nuevo género.
     * Recibe los datos del controlador y los persiste de forma segura en la BD.
     */
    public Genero create(Genero genero) {
        return generoRepository.save(genero);
    }
    
    /**
     * LOGICA ESPECIAL DE LA RELACIÓN 1:M
     * Este método busca el género por su ID y extrae su lista interna de videojuegos.
     * Si el género no existe, devuelve una lista vacía (List.of()) para evitar que el programa lance un error.
     */
    public List<Videojuego> getVideojuegosByGenero(Long id) {
        Genero genero = getById(id);
        return genero != null ? genero.getVideojuegos() : List.of();
    }
}

