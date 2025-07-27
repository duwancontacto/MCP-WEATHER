# 🔧 Solución de Problemas - Inspector MCP de Vercel

## 🚨 Error: "Error Connecting to MCP Inspector Proxy - Check Console logs"

Este error es común cuando se intenta conectar al inspector MCP de Vercel. Aquí están las soluciones:

## 🔍 Diagnóstico

### 1. Verificar que el servidor funciona localmente

```bash
# Probar el endpoint básico
curl http://localhost:3000/api/mcp-simple

# Probar el endpoint MCP completo
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","clientInfo":{"name":"test","version":"1.0.0"},"capabilities":{"tools":{}}}}'
```

### 2. Verificar CORS

```bash
# Probar OPTIONS request
curl -X OPTIONS http://localhost:3000/api/mcp
```

## 🛠️ Soluciones

### Solución 1: Usar el endpoint simplificado

Si el inspector de Vercel no funciona con el endpoint MCP completo, usa el endpoint simplificado:

**URL para el inspector:**

```
http://localhost:3000/api/mcp-simple
```

### Solución 2: Configurar CORS correctamente

Asegúrate de que tu `vercel.json` tenga la configuración CORS correcta:

```json
{
  "headers": [
    {
      "source": "/api/mcp",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, Accept"
        }
      ]
    }
  ]
}
```

### Solución 3: Usar el inspector MCP local

En lugar del inspector de Vercel, usa el inspector MCP local:

```bash
# Instalar el inspector
npm install -g @modelcontextprotocol/inspector

# Ejecutar el inspector
npx @modelcontextprotocol/inspector@latest http://localhost:3000/api/mcp

# O para el endpoint simplificado
npx @modelcontextprotocol/inspector@latest http://localhost:3000/api/mcp-simple
```

Luego abre `http://127.0.0.1:6274` en tu navegador.

### Solución 4: Verificar logs del servidor

1. Abre las herramientas de desarrollador en tu navegador
2. Ve a la pestaña "Console"
3. Busca errores específicos relacionados con CORS o conexión

### Solución 5: Probar con diferentes URLs

Prueba estas URLs en el inspector de Vercel:

1. **Endpoint completo:**

   ```
   http://localhost:3000/api/mcp
   ```

2. **Endpoint simplificado:**

   ```
   http://localhost:3000/api/mcp-simple
   ```

3. **Con protocolo HTTPS (si está disponible):**
   ```
   https://tu-proyecto.vercel.app/api/mcp
   ```

## 🔧 Configuración del Inspector

### Para Cursor

Crea o actualiza `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "weather-server": {
      "url": "http://localhost:3000/api/mcp-simple"
    }
  }
}
```

### Para otros clientes MCP

Usa la URL que funcione mejor para tu caso:

```json
{
  "mcpServers": {
    "weather-server": {
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

## 🧪 Scripts de Prueba

### Probar conectividad básica

```bash
# Ejecutar el script de prueba
npx tsx test-mcp-inspector.js
```

### Probar endpoint simplificado

```bash
# Crear script de prueba para endpoint simplificado
cat > test-simple.js << 'EOF'
import axios from 'axios';

const MCP_URL = 'http://localhost:3000/api/mcp-simple';

async function testSimple() {
  try {
    console.log('🧪 Probando endpoint simplificado...\n');

    // Test GET
    const getResponse = await axios.get(MCP_URL);
    console.log('✅ GET response:', getResponse.data);

    // Test POST initialize
    const initResponse = await axios.post(MCP_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        clientInfo: { name: 'test', version: '1.0.0' },
        capabilities: { tools: {} }
      }
    });
    console.log('✅ Initialize response:', initResponse.data);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testSimple();
EOF

# Ejecutar prueba
npx tsx test-simple.js
```

## 📋 Checklist de Verificación

- [ ] Servidor ejecutándose en `localhost:3000`
- [ ] Endpoint `/api/mcp` responde correctamente
- [ ] Endpoint `/api/mcp-simple` responde correctamente
- [ ] CORS configurado correctamente
- [ ] Headers Accept incluyen `application/json, text/event-stream`
- [ ] Inspector MCP local funciona
- [ ] Logs del navegador no muestran errores CORS

## 🆘 Si nada funciona

1. **Usar el inspector local** en lugar del de Vercel
2. **Verificar la versión de Node.js** (debe ser 18+)
3. **Reiniciar el servidor** de desarrollo
4. **Limpiar caché** del navegador
5. **Probar en modo incógnito**

## 📞 Obtener Ayuda

Si sigues teniendo problemas:

1. Revisa los logs del servidor en la terminal
2. Verifica los logs del navegador (F12 > Console)
3. Prueba con el inspector MCP local
4. Abre un issue en el repositorio con los logs de error

## 🎯 Endpoints Disponibles

- **`/api/mcp`**: Endpoint MCP completo con mcp-handler
- **`/api/mcp-simple`**: Endpoint MCP simplificado para compatibilidad
- **`/api/test`**: Endpoint de prueba básico

Usa el que funcione mejor con tu inspector MCP.
