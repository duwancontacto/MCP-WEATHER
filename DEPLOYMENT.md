# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu servidor MCP en Vercel paso a paso.

## 📋 Prerrequisitos

1. **Cuenta de Vercel**: Crea una cuenta en [vercel.com](https://vercel.com)
2. **Repositorio Git**: Tu proyecto debe estar en GitHub, GitLab o Bitbucket
3. **Node.js**: Asegúrate de tener Node.js 18+ instalado

## 🔧 Paso a Paso

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio contenga todos los archivos necesarios:

```bash
# Verificar que tienes todos los archivos
ls -la

# Deberías ver:
# - app/api/mcp/route.ts
# - package.json
# - next.config.js
# - tsconfig.json
# - vercel.json
```

### 2. Conectar con Vercel

1. **Ve a Vercel**: Abre [vercel.com](https://vercel.com)
2. **Inicia sesión**: Usa tu cuenta de GitHub/GitLab/Bitbucket
3. **Nuevo proyecto**: Haz clic en "New Project"
4. **Importar repositorio**: Selecciona tu repositorio
5. **Configuración automática**: Vercel detectará que es un proyecto Next.js

### 3. Configurar Variables de Entorno (Opcional)

Si tu proyecto usa variables de entorno:

1. En tu proyecto de Vercel, ve a **Settings** > **Environment Variables**
2. Agrega las variables necesarias
3. Selecciona los entornos (Production, Preview, Development)

### 4. Desplegar

1. **Revisar configuración**: Verifica que todo esté correcto
2. **Deploy**: Haz clic en "Deploy"
3. **Esperar**: Vercel construirá y desplegará tu proyecto
4. **URL**: Obtendrás una URL como `https://tu-proyecto.vercel.app`

## 🔍 Verificar el Despliegue

### 1. Probar la Página Principal

Visita tu URL de Vercel para ver la página principal:

```
https://tu-proyecto.vercel.app
```

### 2. Probar el Endpoint MCP

Puedes probar el endpoint MCP directamente:

```bash
# Probar que responde
curl https://tu-proyecto.vercel.app/api/mcp

# Probar con el inspector MCP
npx @modelcontextprotocol/inspector@latest https://tu-proyecto.vercel.app/api/mcp
```

### 3. Configurar Cliente MCP

#### Para Cursor:

Crea el archivo `.cursor/mcp.json` en tu proyecto local:

```json
{
  "mcpServers": {
    "weather-server": {
      "url": "https://tu-proyecto.vercel.app/api/mcp"
    }
  }
}
```

#### Para otros clientes:

Usa la URL completa del endpoint:

```
https://tu-proyecto.vercel.app/api/mcp
```

## 🛠️ Configuración Avanzada

### Personalizar Dominio

1. Ve a **Settings** > **Domains**
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

### Configurar Variables de Entorno

Si necesitas configurar variables de entorno:

```bash
# En Vercel Dashboard > Settings > Environment Variables
OPENWEATHER_API_KEY=tu_api_key_aqui
```

### Optimizar Rendimiento

El archivo `vercel.json` ya incluye optimizaciones:

- **maxDuration**: 30 segundos para funciones
- **CORS headers**: Configurados para MCP
- **Cache**: Optimizado para APIs

## 🔍 Troubleshooting

### Error: "Function timeout"

- Verifica que `vercel.json` tenga `maxDuration: 30`
- Revisa los logs en Vercel Dashboard

### Error: "Module not found"

- Asegúrate de que todas las dependencias estén en `package.json`
- Ejecuta `pnpm install` localmente para verificar

### Error: "Build failed"

- Revisa los logs de build en Vercel Dashboard
- Verifica que `next.config.js` esté configurado correctamente

### Error: "CORS error"

- Verifica que `vercel.json` tenga los headers CORS correctos
- Asegúrate de que el endpoint responda correctamente

## 📊 Monitoreo

### Logs en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a **Functions** > **api/mcp**
3. Revisa los logs en tiempo real

### Métricas

- **Function invocations**: Número de llamadas
- **Duration**: Tiempo de respuesta
- **Errors**: Errores y excepciones

## 🔄 Actualizaciones

Para actualizar tu despliegue:

1. **Push a Git**: Haz push de tus cambios al repositorio
2. **Deploy automático**: Vercel desplegará automáticamente
3. **Verificar**: Revisa que todo funcione correctamente

## 📞 Soporte

- **Documentación Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Issues**: Abre un issue en tu repositorio

## 🎉 ¡Listo!

Tu servidor MCP está ahora desplegado en Vercel y listo para usar con cualquier cliente MCP compatible.
