# Backend III

API REST desarrollada con Node.js, Express y MongoDB para gestionar usuarios, productos y datos de prueba de una plataforma logística.

## Tecnologías

Node.js · Express · MongoDB · Mongoose · dotenv · Faker.js · Winston · Swagger · Postman

## Arquitectura

Router → Controller → Service → Repository → MongoDB

- **Router:** define los endpoints de la API.
- **Controller:** gestiona las solicitudes y las respuestas HTTP.
- **Service:** contiene la lógica de negocio y las validaciones.
- **Repository:** encapsula el acceso a MongoDB.
- **Errors:** centraliza los errores de dominio y el middleware global.
- **Config:** centraliza la configuración del entorno, Swagger y Winston.
- **Docs:** contiene la documentación OpenAPI de los endpoints y esquemas.

## Instalación y ejecución

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/Gomez-Dev/backend-101970.git
cd backend-101970
npm install
```

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/backend-iii
NODE_ENV=development
```

Los nombres de las variables deben coincidir con los utilizados en la configuración del proyecto. No subir el archivo `.env` al repositorio; utilizar `.env.example` como referencia.

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

Se necesita una instancia de MongoDB accesible mediante la URI configurada.

## Documentación interactiva con Swagger

La documentación de la API se encuentra en:

**http://localhost:3000/api/docs**

Swagger UI permite consultar los métodos HTTP, las rutas, los parámetros, los cuerpos de las solicitudes, las respuestas y los esquemas reutilizables.

La documentación incluye los módulos Users, Products, Mocks y Logger, además de los esquemas de usuarios, productos, pedidos, entregas, artículos de pedido y respuestas de éxito y error.

Orders y Deliveries cuentan con modelos utilizados durante la generación de datos de prueba mediante el endpoint de seed de Mocks. Actualmente no se exponen routers independientes para estos recursos en `src/app.js`.

## Endpoints

### Usuarios — `/api/users`

| Método | Ruta             | Acción                    |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/users`     | Listar usuarios           |
| POST   | `/api/users`     | Crear un usuario          |
| GET    | `/api/users/:id` | Obtener un usuario por ID |
| PUT    | `/api/users/:id` | Actualizar un usuario     |
| DELETE | `/api/users/:id` | Eliminar un usuario       |

### Productos — `/api/products`

| Método | Ruta                | Acción                       |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/products`     | Listar productos disponibles |
| POST   | `/api/products`     | Crear un producto            |
| GET    | `/api/products/:id` | Obtener un producto por ID   |
| PUT    | `/api/products/:id` | Actualizar un producto       |
| DELETE | `/api/products/:id` | Eliminar un producto         |

Ejemplo de creación de un producto:

```json
{
  "title": "Notebook",
  "description": "Notebook para trabajo",
  "price": 500000,
  "stock": 10
}
```

El servicio determina automáticamente el estado del producto según su stock.

### Mocks — `/api/mocks`

| Método | Ruta                     | Acción                                           |
| ------ | ------------------------ | ------------------------------------------------ |
| GET    | `/api/mocks/users?qty=5` | Generar usuarios simulados en memoria            |
| POST   | `/api/mocks/seed?qty=3`  | Insertar datos de prueba relacionados en MongoDB |

El parámetro `qty` es opcional, tiene un valor predeterminado de `1` y admite cantidades enteras entre `1` y `100`.

- **GET `/api/mocks/users`:** genera usuarios ficticios en memoria, sin persistirlos en MongoDB.
- **POST `/api/mocks/seed`:** crea la cantidad indicada de clientes, un conductor, la misma cantidad de pedidos y entregas relacionadas.

Las cantidades inválidas o superiores al máximo permitido generan una respuesta HTTP `400`. Los errores durante la generación o persistencia de los datos se procesan mediante el middleware global de errores.

### Logger — `/loggerTest`

El endpoint `GET /loggerTest` permite validar técnicamente el sistema de logging de Winston. Genera registros de prueba para los niveles configurados y devuelve una respuesta de confirmación.

No realiza operaciones de negocio.

Para probarlo, acceder a:

`http://localhost:3000/loggerTest`

También puede ejecutarse desde Postman mediante el método `GET`.

## Manejo de errores

Los errores se centralizan mediante las clases de error de dominio, el diccionario de errores y un middleware global.

La respuesta de error utiliza la siguiente estructura:

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}
```

Entre los códigos de error definidos se encuentran:

- `USER_NOT_FOUND`
- `PRODUCT_NOT_FOUND`
- `INVALID_ID`
- `INVALID_MOCK_QUANTITY`
- `MOCK_QUANTITY_EXCEEDED`
- `DATABASE_ERROR`
- `INTERNAL_SERVER_ERROR`

Los errores personalizados utilizan los códigos HTTP definidos en el diccionario de errores. Los errores inesperados se procesan mediante el middleware global.

## Logging con Winston

Winston registra eventos con fecha, hora y nivel. Los niveles configurados son `debug`, `http`, `info`, `warning`, `error` y `fatal`.

- **Desarrollo:** la consola muestra desde `debug`.
- **Producción:** la consola muestra desde `info`.
- `logs/application-AAAA-MM-DD.log`: registros generales con rotación diaria.
- `logs/error.log`: registros de nivel `error` y `fatal`.
- `logs/error-AAAA-MM-DD.log`: historial rotativo de errores.

Los archivos de logs generados se excluyen de Git mediante `.gitignore`.

### Probar el logger

1. Iniciar el servidor con `npm run dev`.
2. Ejecutar `GET http://localhost:3000/loggerTest` desde Postman o el navegador.
3. Confirmar la respuesta HTTP `200`.
4. Revisar la consola y los archivos generados dentro de `logs/`.

## Modelos, relaciones y constantes

Los roles, estados y prioridades están centralizados en `src/constants/index.js`.

- Los pedidos referencian al cliente mediante un `ObjectId`.
- Las entregas referencian al pedido y al conductor.
- Los modelos de pedidos y entregas se utilizan en la generación de datos de prueba.
- Los estados y prioridades se definen mediante constantes para mantener valores consistentes en la aplicación.
