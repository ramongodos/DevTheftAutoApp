package devtheftauto.devtheftauto.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import devtheftauto.devtheftauto.model.Videojuego;
import devtheftauto.devtheftauto.service.VideojuegoService;

/**
 * Controlador REST para gestionar las operaciones del Videojuego (Entidad Hija).
 * URL base: http://localhost:8080/api/videojuegos
 */
@RestController
@RequestMapping("/api/videojuegos")
@RequiredArgsConstructor // Genera el constructor para inyectar el servicio de videojuegos
@CrossOrigin(origins = "http://localhost:4200") // Permite la comunicación bidireccional con Angular
public class VideojuegoController {

    private final VideojuegoService videojuegoService;

    /**
     * GET /api/videojuegos
     * Recupera y devuelve la lista de todos los videojuegos guardados.
     */
    @GetMapping
    public ResponseEntity<List<Videojuego>> getAll() {
        return ResponseEntity.ok(videojuegoService.getAll());
    }

    /**
     * GET /api/videojuegos/{id}
     * Obtiene los detalles de un único videojuego pasando su ID en la URL.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Videojuego> getById(@PathVariable Long id) {
        Videojuego videojuego = videojuegoService.getById(id);
        return videojuego != null ? ResponseEntity.ok(videojuego) : ResponseEntity.notFound().build();
    }

    /**
     * POST /api/videojuegos
     * Recibe el payload del formulario reactivo de Angular para guardar un nuevo videojuego.
     * Devuelve el código HTTP 201 (Created).
     */
    @PostMapping
    public ResponseEntity<Videojuego> create(@RequestBody Videojuego videojuego) {
        return ResponseEntity.status(201).body(videojuegoService.create(videojuego));
    }

    /**
     * PUT /api/videojuegos/{id}
     * Recibe los datos modificados de un juego y actualiza su registro basándose en el ID.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Videojuego> update(@PathVariable Long id, @RequestBody Videojuego v) {
        Videojuego actualizado = videojuegoService.update(id, v);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    /**
     * DELETE /api/videojuegos/{id}
     * Elimina por completo un videojuego del catálogo según el ID seleccionado.
     * Devuelve un estado 204 No Content para confirmar que el borrado fue exitoso.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        videojuegoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
