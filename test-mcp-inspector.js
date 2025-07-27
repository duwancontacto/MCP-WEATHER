import axios from "axios";

const MCP_URL = "http://localhost:3000/api/mcp";

async function testMCPInspector() {
  try {
    console.log("🧪 Probando MCP para Inspector...\n");

    // Test 1: Verificar que el servidor responde a GET
    console.log("1️⃣ Probando GET request...");
    try {
      const getResponse = await axios.get(MCP_URL);
      console.log("✅ GET response:", getResponse.status);
    } catch (error) {
      console.log(
        "⚠️ GET request failed (expected for MCP):",
        error.response?.status
      );
    }

    // Test 2: Probar OPTIONS request
    console.log("\n2️⃣ Probando OPTIONS request...");
    try {
      const optionsResponse = await axios.options(MCP_URL);
      console.log("✅ OPTIONS response:", optionsResponse.status);
      console.log("📋 CORS headers:", optionsResponse.headers);
    } catch (error) {
      console.log("❌ OPTIONS request failed:", error.message);
    }

    // Test 3: Probar POST con headers correctos
    console.log("\n3️⃣ Probando POST con headers MCP...");
    const mcpRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        clientInfo: {
          name: "mcp-inspector",
          version: "1.0.0",
        },
        capabilities: {
          tools: {},
        },
      },
    };

    try {
      const postResponse = await axios.post(MCP_URL, mcpRequest, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
      });
      console.log("✅ POST response:", postResponse.status);
      console.log("📋 Response data:", postResponse.data);
    } catch (error) {
      console.log(
        "❌ POST request failed:",
        error.response?.data || error.message
      );
    }

    // Test 4: Probar listar herramientas
    console.log("\n4️⃣ Probando listar herramientas...");
    const listToolsRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {},
    };

    try {
      const toolsResponse = await axios.post(MCP_URL, listToolsRequest, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
      });
      console.log("✅ Tools list response:", toolsResponse.status);
      console.log("📋 Tools:", toolsResponse.data);
    } catch (error) {
      console.log(
        "❌ Tools list failed:",
        error.response?.data || error.message
      );
    }
  } catch (error) {
    console.error("❌ Error general:", error.message);
  }
}

// Ejecutar la prueba
testMCPInspector();
