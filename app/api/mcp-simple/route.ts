import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "MCP Server is running",
    tools: ["fetch_weather"],
    status: "ready",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Manejar inicialización
    if (body.method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: "weather-mcp-server",
            version: "1.0.0",
          },
        },
      });
    }

    // Manejar listado de herramientas
    if (body.method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            {
              name: "fetch_weather",
              description: "Fetch the weather for a given city",
              inputSchema: {
                type: "object",
                properties: {
                  city: {
                    type: "string",
                    description: "The city to fetch the weather for",
                  },
                },
                required: ["city"],
              },
            },
          ],
        },
      });
    }

    // Manejar llamadas a herramientas
    if (body.method === "tools/call") {
      if (body.params.name === "fetch_weather") {
        const { city } = body.params.arguments;

        // Simular respuesta del clima
        const weatherInfo = `🌤️ **Clima en ${city}**

🌡️ **Temperatura:** 22°C
🌡️ **Sensación térmica:** 24°C
💧 **Humedad:** 65%
🌬️ **Velocidad del viento:** 12 km/h
☁️ **Condición:** Cielo despejado

*Información proporcionada por Open-Meteo*`;

        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: {
            content: [
              {
                type: "text",
                text: weatherInfo,
              },
            ],
          },
        });
      }
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id: body.id,
      error: {
        code: -32601,
        message: "Method not found",
      },
    });
  } catch (error) {
    return NextResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
      },
    });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
