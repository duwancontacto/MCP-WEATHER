# 🌤️ MCP Weather Server

Servidor MCP (Model Context Protocol) para obtener información del clima usando la integración de Vercel.

## 🚀 Características

- **Herramienta `fetch_weather`**: Obtiene información del clima para cualquier ciudad
- **Integración con Vercel**: Despliegue optimizado usando Vercel Functions
- **API de Open-Meteo**: Datos meteorológicos gratuitos y precisos
- **Respuestas en español**: Información del clima en español

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [MCP Handler](https://github.com/modelcontextprotocol/mcp-handler) - Servidor MCP
- [Open-Meteo API](https://open-meteo.com/) - API meteorológica
- [Vercel](https://vercel.com/) - Plataforma de despliegue

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd MCPPOC

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

## 🚀 Despliegue en Vercel

### 1. Preparar el proyecto

Asegúrate de que tu proyecto esté en un repositorio de GitHub, GitLab o Bitbucket.

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "New Project"
3. Importa tu repositorio
4. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configurar variables de entorno (opcional)

Si necesitas configurar variables de entorno:

- Ve a tu proyecto en Vercel
- Navega a Settings > Environment Variables
- Agrega las variables necesarias

### 4. Desplegar

Vercel desplegará automáticamente tu proyecto. Obtendrás una URL como:
`https://tu-proyecto.vercel.app`

## 🔧 Configuración del Cliente MCP

### Para Cursor

Crea el archivo `.cursor/mcp.json` en tu proyecto:

```json
{
  "mcpServers": {
    "weather-server": {
      "url": "https://tu-proyecto.vercel.app/api/mcp"
    }
  }
}
```

### Para otros clientes MCP

Usa la URL de tu servidor MCP desplegado:
`https://tu-proyecto.vercel.app/api/mcp`

## 🧪 Probar localmente

```bash
# Ejecutar el servidor de desarrollo
pnpm dev

# En otra terminal, usar el inspector MCP
npx @modelcontextprotocol/inspector@latest http://localhost:3000
```

Luego abre `http://127.0.0.1:6274` para usar el inspector.

## 📋 Herramientas disponibles

### `fetch_weather`

Obtiene información del clima para una ciudad específica.

**Parámetros:**

- `city` (string): Nombre de la ciudad

**Ejemplo de uso:**

```javascript
// En Cursor o cualquier cliente MCP
fetch_weather({ city: "Madrid" });
```

**Respuesta:**

```
🌤️ **Clima en Madrid, España**

🌡️ **Temperatura:** 22°C
🌡️ **Sensación térmica:** 24°C
💧 **Humedad:** 65%
🌬️ **Velocidad del viento:** 12 km/h
☁️ **Condición:** Cielo despejado

*Información proporcionada por Open-Meteo*
```

## 🏗️ Estructura del proyecto

```
MCPPOC/
├── app/
│   ├── api/
│   │   └── mcp/
│   │       └── route.ts          # Endpoint MCP
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🔍 Troubleshooting

### Error de conexión

- Verifica que la URL del servidor MCP sea correcta
- Asegúrate de que el proyecto esté desplegado en Vercel

### Error de ciudad no encontrada

- Verifica el nombre de la ciudad
- Usa nombres en inglés para mejor compatibilidad

### Error de red

- Verifica tu conexión a internet
- Las APIs de Open-Meteo son gratuitas y no requieren API key

## 📄 Licencia

MIT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas, abre un issue en el repositorio.
