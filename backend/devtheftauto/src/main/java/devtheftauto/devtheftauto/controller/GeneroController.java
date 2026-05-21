package devtheftauto.devtheftauto.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import devtheftauto.devtheftauto.model.Genero;
import devtheftauto.devtheftauto.model.Videojuego;
import devtheftauto.devtheftauto.service.GeneroService;


/**
 * Controlador REST para gestionar las operaciones del Género (Entidad Padre).
 * URL base: http://localhost:8080/api/generos
 */
@RestController
@RequestMapping("/api/generos")
@RequiredArgsConstructor // Genera el constructor para inyectar el servicio automáticamente
@CrossOrigin(origins = "http://localhost:4200") // Evita problemas de CORS al conectar con Angular
public class GeneroController {

    private final GeneroService generoService;

    /**
     * GET /api/generos
     * Devuelve la lista completa de todos los géneros creados.
     */
    @GetMapping
    public ResponseEntity<List<Genero>> getAll() {
        return ResponseEntity.ok(generoService.getAll());
    }

    /**
     * GET /api/generos/{id}
     * Busca un género específico por su ID en la URL.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Genero> getById(@PathVariable Long id) {
        Genero genero = generoService.getById(id);
        return genero != null ? ResponseEntity.ok(genero) : ResponseEntity.notFound().build();
    }

    /**
     * Endpoint especial: GET /api/generos/{id}/videojuegos
     * 
     * Permite listar todos los videojuegos que pertenecen a un género en concreto.
     */
    @GetMapping("/{id}/videojuegos")
    public ResponseEntity<List<Videojuego>> getVideojuegos(@PathVariable Long id) {
        return ResponseEntity.ok(generoService.getVideojuegosByGenero(id));
    }

    /**
     * POST /api/generos
     * Recibe un JSON con los datos de un nuevo género y lo crea en el sistema.
     * Devuelve el código HTTP 201 (Created).
     */
    @PostMapping
    public ResponseEntity<Genero> create(@RequestBody Genero genero) {
        return ResponseEntity.status(201).body(generoService.create(genero));
    }
}
