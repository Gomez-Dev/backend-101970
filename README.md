# Backend III — ShipNow

API REST desarrollada con Node.js, Express y MongoDB para gestionar usuarios, productos, pedidos y entregas de una plataforma logística.

## Tecnologías

- Node.js
- Express
- MongoDB y Mongoose
- Mocha, Chai y Supertest
- dotenv
- Faker.js
- Winston
- Swagger / OpenAPI
- Multer
- Postman

## Arquitectura

**Router → Controller → Service → Repository → Model**

- **Router:** define los endpoints de la API.
- **Controller:** gestiona las solicitudes y las respuestas HTTP.
- **Service:** contiene la lógica de negocio y las validaciones.
- **Repository:** encapsula el acceso a MongoDB.
- **Model:** define los esquemas y las validaciones de los documentos.
- **Errors:** centraliza los errores de dominio y el middleware global.
- **Config:** centraliza la configuración del entorno, Swagger, base de datos, Winston y Multer.
- **Docs:** contiene la documentación OpenAPI de los endpoints y esquemas.
- **Middlewares:** contiene los middlewares de validación y procesamiento de solicitudes, incluida la carga de archivos.

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

MONGODB_URI=mongodb://127.0.0.1:27017/shipnow

NODE_ENV=development
```

Los nombres de las variables deben coincidir con los utilizados en la configuración del proyecto.

No subir el archivo `.env` al repositorio. Utilizar `.env.example` como referencia.

Se necesita una instancia de MongoDB accesible mediante la URI configurada.

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

La API estará disponible en:

http://localhost:3000

## Documentación interactiva con Swagger

La documentación de la API se encuentra en:

http://localhost:3000/api/docs

Swagger UI permite consultar los métodos HTTP, las rutas, los parámetros, los cuerpos de las solicitudes, las respuestas y los esquemas reutilizables.

La documentación incluye los módulos Users, Products, Orders, Deliveries, Mocks y Logger, además de esquemas reutilizables para usuarios, productos, pedidos, entregas, artículos de pedido y respuestas de éxito y error.

También documenta los endpoints de carga de archivos mediante `multipart/form-data`.

## Endpoints

### Usuarios — `/api/users`

| Método | Ruta                       | Acción                         |
| ------ | -------------------------- | ------------------------------ |
| GET    | `/api/users`               | Listar usuarios                |
| POST   | `/api/users`               | Crear un usuario               |
| GET    | `/api/users/:id`           | Obtener un usuario por ID      |
| PUT    | `/api/users/:id`           | Actualizar un usuario          |
| DELETE | `/api/users/:id`           | Eliminar un usuario            |
| POST   | `/api/users/:id/documents` | Cargar un documento de usuario |

### Productos — `/api/products`

| Método | Ruta                | Acción                     |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/products`     | Listar productos           |
| POST   | `/api/products`     | Crear un producto          |
| GET    | `/api/products/:id` | Obtener un producto por ID |
| PUT    | `/api/products/:id` | Actualizar un producto     |
| DELETE | `/api/products/:id` | Eliminar un producto       |

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

### Pedidos — `/api/orders`

| Método | Ruta              | Acción                   |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/orders`     | Listar pedidos           |
| POST   | `/api/orders`     | Crear un pedido          |
| GET    | `/api/orders/:id` | Obtener un pedido por ID |
| PUT    | `/api/orders/:id` | Actualizar un pedido     |

Los pedidos contienen información del cliente, artículos, dirección de entrega, total, estado y prioridad.

### Entregas — `/api/deliveries`

| Método | Ruta                           | Acción                           |
| ------ | ------------------------------ | -------------------------------- |
| GET    | `/api/deliveries`              | Listar entregas                  |
| POST   | `/api/deliveries`              | Crear una entrega                |
| POST   | `/api/deliveries/:id/receipts` | Cargar un comprobante de entrega |

Las entregas relacionan un pedido con un conductor y contemplan estados y prioridades definidos mediante constantes.

## Carga de archivos — Multer

El proyecto incorpora Multer para gestionar la carga de documentos y comprobantes mediante solicitudes `multipart/form-data`.

Los archivos se almacenan físicamente en el servidor y sus metadatos se registran en MongoDB, asociados a la entidad correspondiente.

### Tipos de archivos permitidos

- PDF
- JPG
- JPEG
- PNG

**Tamaño máximo permitido: 5 MB por archivo.**

### Documentos de usuarios

Endpoint:

```http
POST /api/users/:id/documents
```

Parámetros:

| Campo          | Tipo   | Descripción                       |
| -------------- | ------ | --------------------------------- |
| `id`           | Path   | Identificador MongoDB del usuario |
| `file`         | File   | Archivo PDF, JPG, JPEG o PNG      |
| `documentType` | String | Tipo de documento                 |

Tipos de documentos admitidos:

- `DNI`
- `DRIVER_LICENSE`
- `ADDRESS_PROOF`

Ejemplo de solicitud mediante Postman:

- Método: `POST`
- URL: `/api/users/:id/documents`
- Body: `form-data`
- Campo `file`: seleccionar el archivo.
- Campo `documentType`: indicar el tipo de documento.

### Comprobantes de entregas

Endpoint:

```http
POST /api/deliveries/:id/receipts
```

Parámetros:

| Campo  | Tipo | Descripción                         |
| ------ | ---- | ----------------------------------- |
| `id`   | Path | Identificador MongoDB de la entrega |
| `file` | File | Archivo PDF, JPG, JPEG o PNG        |

Se permite asociar múltiples comprobantes a una misma entrega mediante solicitudes sucesivas.

### Metadatos almacenados

MongoDB almacena los metadatos de los archivos, no su contenido binario.

La información registrada incluye:

- Nombre original.
- Nombre generado para el archivo.
- Ruta de almacenamiento.
- Tipo MIME.
- Tamaño en bytes.
- Tipo de documento, cuando corresponde.
- Fecha de carga.

Los archivos se organizan en las siguientes carpetas:

```text
uploads/
├── users/
└── deliveries/
```

La configuración de Multer se encuentra centralizada y separada de los routers.

La carpeta `uploads/` está excluida del repositorio mediante `.gitignore`, evitando subir archivos cargados por los usuarios a GitHub.

### Validaciones de carga

La implementación contempla:

- Archivo obligatorio.
- Formatos permitidos.
- Tamaño máximo de 5 MB.
- Validación del campo esperado (`file`).
- Validación del tipo de documento.
- Verificación de existencia del usuario o entrega.
- Manejo de errores durante el almacenamiento y asociación de archivos.
- Eliminación del archivo físico cuando ocurre un error durante su persistencia.

Los errores de carga se integran con el sistema centralizado de manejo de errores.

## Mocks — `/api/mocks`

| Método | Ruta                      | Acción                              |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/api/mocks/users?qty=5`  | Generar usuarios simulados          |
| GET    | `/api/mocks/orders?qty=5` | Generar pedidos simulados           |
| POST   | `/api/mocks/seed?qty=3`   | Insertar datos de prueba en MongoDB |

El parámetro `qty` es opcional, tiene un valor predeterminado de `1` y admite cantidades enteras entre `1` y `100`.

- **GET `/api/mocks/users`:** genera usuarios ficticios en memoria, sin persistirlos en MongoDB.
- **GET `/api/mocks/orders`:** genera pedidos ficticios en memoria.
- **POST `/api/mocks/seed`:** crea clientes, un conductor, pedidos y entregas relacionadas en MongoDB.

Las cantidades inválidas o superiores al máximo permitido generan una respuesta HTTP `400`.

## Logger — `/loggerTest`

El endpoint `GET /loggerTest` permite validar el sistema de logging de Winston.

Genera registros de prueba para los niveles configurados y devuelve una respuesta de confirmación.

No realiza operaciones de negocio.

Para probarlo:

http://localhost:3000/loggerTest

También puede ejecutarse desde Postman mediante el método GET.

## Manejo de errores

Los errores se centralizan mediante clases de error de dominio, un diccionario de errores y un middleware global.

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
- `ORDER_NOT_FOUND`
- `DELIVERY_NOT_FOUND`
- `INVALID_ID`
- `INVALID_MOCK_QUANTITY`
- `MOCK_QUANTITY_EXCEEDED`
- `DATABASE_ERROR`
- `INTERNAL_SERVER_ERROR`
- `ROUTE_NOT_FOUND`
- `VALIDATION_ERROR`
- `FILE_REQUIRED`
- `INVALID_FILE_TYPE`
- `FILE_TOO_LARGE`
- `UNEXPECTED_FILE_FIELD`
- `INVALID_DOCUMENT_TYPE`
- `FILE_SAVE_ERROR`

Los errores de validación de Mongoose se responden con HTTP `400` y código `VALIDATION_ERROR`.

Los errores personalizados utilizan los códigos HTTP definidos en el diccionario de errores. Los errores inesperados se procesan mediante el middleware global.

Las rutas inexistentes devuelven HTTP `404` con el código `ROUTE_NOT_FOUND`.

## Testing funcional

El proyecto utiliza las siguientes herramientas:

- **Mocha:** ejecución y organización de las pruebas.
- **Chai:** validación de resultados y respuestas.
- **Supertest:** pruebas HTTP sobre la aplicación Express.

Las pruebas están organizadas dentro de la carpeta `tests/`, separadas por recurso:

```text
tests/
├── app.test.js
├── deliveries.test.js
├── logger.test.js
├── mocks.test.js
├── orders.test.js
├── setup.js
├── swagger.test.js
└── users.test.js
```

### Configuración del entorno de testing

Crear un archivo `.env.test` en la raíz del proyecto:

```env
PORT=3001

MONGODB_URI=mongodb://127.0.0.1:27017/shipnow_test

NODE_ENV=test
```

El entorno de testing utiliza una base de datos independiente de la utilizada durante el desarrollo.

El archivo `tests/setup.js` configura la conexión a MongoDB, limpia la base de datos antes de cada prueba y cierra la conexión al finalizar la ejecución.

El archivo `.env.test` no debe subirse al repositorio. Se proporciona un archivo `.env.test.example` como referencia.

Para configurar el entorno de pruebas:

```bash
cp .env.test.example .env.test
```

En Windows también puede copiarse manualmente el archivo `.env.test.example` y renombrar la copia como `.env.test`.

### Ejecutar las pruebas

Desde la raíz del proyecto:

```bash
npm test
```

No es necesario iniciar manualmente el servidor de desarrollo para ejecutar las pruebas. Supertest realiza las solicitudes directamente sobre la aplicación Express.

La instancia de MongoDB debe estar disponible y el entorno de testing debe estar configurado correctamente.

### Cobertura de las pruebas

Las pruebas funcionales contemplan:

- **Users:** creación, consulta, actualización, eliminación, validaciones y carga de documentos.
- **Products:** operaciones y validaciones del recurso.
- **Orders:** creación, listado, consulta por ID, actualización de estado y validaciones.
- **Deliveries:** creación, listado, valores predeterminados, validaciones y carga de comprobantes.
- **Mocks:** generación de usuarios y pedidos, validación de cantidades y persistencia mediante seed.
- **Logger:** verificación de la respuesta del endpoint y sus niveles de logging.
- **Swagger:** generación de la especificación OpenAPI, presencia de los endpoints documentados y acceso HTTP a Swagger UI.
- **Aplicación:** verificación de respuestas HTTP `404` para rutas inexistentes.

Las pruebas de carga de archivos verifican, entre otros escenarios:

- Carga correcta de documentos y comprobantes.
- Rechazo de solicitudes sin archivos.
- Rechazo de formatos no permitidos.
- Rechazo de tipos de documento inválidos.
- Rechazo de archivos que superan el tamaño máximo.
- Rechazo de campos de archivo incorrectos.
- Rechazo de comprobantes asociados a entregas inexistentes.
- Asociación de múltiples comprobantes a una misma entrega.

**Última ejecución registrada: 52 pruebas aprobadas.**

## Logging con Winston

Winston registra eventos con fecha, hora y nivel.

Los niveles configurados son `debug`, `http`, `info`, `warning`, `error` y `fatal`.

- **Desarrollo:** la consola muestra desde `debug`.
- **Producción:** la consola muestra desde `info`.
- `logs/application-AAAA-MM-DD.log`: registros generales con rotación diaria.
- `logs/error.log`: registros de nivel `error` y `fatal`.
- `logs/error-AAAA-MM-DD.log`: historial rotativo de errores.

Los archivos de logs generados se excluyen de Git mediante `.gitignore`.

El sistema también registra eventos relacionados con la carga de archivos, incluyendo cargas exitosas, errores, intentos de carga de formatos no permitidos y asociación de comprobantes a entregas.

## Modelos, relaciones y constantes

Los roles, estados y prioridades están centralizados en `src/constants/index.js`.

- Los pedidos referencian al cliente mediante un `ObjectId`.
- Las entregas referencian al pedido y al conductor.
- Los modelos de pedidos y entregas se utilizan en la generación de datos de prueba.
- Los documentos se asocian al modelo de usuario.
- Los comprobantes se asocian al modelo de entrega.
- Los estados y prioridades se definen mediante constantes para mantener valores consistentes en la aplicación.

## Control de versiones

El repositorio excluye archivos que no deben compartirse, como:

- `node_modules/`
- `.env`
- `.env.test`
- Archivos de logs generados.
- Archivos cargados por usuarios en `uploads/`.

Los archivos de ejemplo de configuración se mantienen disponibles para facilitar la instalación y ejecución del proyecto.
