import axios from "axios";

const MCP_URL = "http://localhost:3000/api/mcp";

async function testMCP() {
  try {
    console.log("🧪 Probando servidor MCP...\n");

    // Test 1: Verificar que el servidor responde
    console.log("1️⃣ Verificando respuesta del servidor...");
    const response = await axios.get(MCP_URL);
    console.log("✅ Servidor responde correctamente\n");

    // Test 2: Probar la herramienta fetch_weather
    console.log("2️⃣ Probando herramienta fetch_weather...");

    const testCity = "Madrid";
    console.log(`🌤️ Obteniendo clima para: ${testCity}`);

    // Simular una llamada MCP
    const mcpRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "fetch_weather",
        arguments: {
          city: testCity,
        },
      },
    };

    const mcpResponse = await axios.post(MCP_URL, mcpRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (mcpResponse.data.result) {
      console.log("✅ Herramienta fetch_weather funciona correctamente");
      console.log("📋 Respuesta:", mcpResponse.data.result.content[0].text);
    } else {
      console.log("❌ Error en la herramienta:", mcpResponse.data.error);
    }
  } catch (error) {
    console.error("❌ Error al probar MCP:", error.message);

    if (error.response) {
      console.error("📊 Status:", error.response.status);
      console.error("📋 Data:", error.response.data);
    }
  }
}

// Ejecutar la prueba
testMCP();
