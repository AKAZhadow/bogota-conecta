# Bogotá Conecta — Proyecto académico

Frontend para consultar eventos culturales de Bogotá, organizado para consultar eventos culturales y sus detalles.

## Cómo ejecutar
1. Descomprimir la carpeta `bogota-conecta`.
2. Abrir `index.html` en un navegador (o usar Live Server en Visual Studio Code).

## Casos de uso implementados en el frontend
1. **Consultar eventos culturales:** botones «Consultar eventos culturales» del encabezado y de la portada.
2. **Visualizar listado de eventos:** sección «Eventos culturales disponibles».
3. **Seleccionar un evento:** botón «Ver detalles» en cada tarjeta.
4. **Consultar detalles del evento:** botón «Consultar detalles del evento» en la sección del evento seleccionado; abre la vista detallada.

## Correspondencia con el diagrama de clases
- `Evento`: representa id, nombre, descripción, fecha y ubicación; incluye `obtenerInformacion()`.
- `RepositorioEvento`: `buscarTodos()` y `buscarPorId(id)`.
- `ServicioEvento`: `obtenerTodos()` y `obtenerPorId(id)`.
- `ControladorEvento`: `listarEventos()` y `obtenerEventoPorId(id)`.

## Datos y alcance
Los tres eventos incluidos son **ficticios y demostrativos**. La aplicación implementa el flujo de consulta en JavaScript para la demostración académica. No incluye una API REST real, backend Spring Boot, Spring Data JPA ni conexión a MySQL. Por tanto, las capas de backend y persistencia de los diagramas C4 se representan conceptualmente, pero no están desplegadas ni conectadas en esta entrega.

## Tecnologías
HTML5, CSS3 y JavaScript (ES6).
