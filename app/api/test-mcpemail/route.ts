import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Test MCP Email Server is running",
    tools: ["send_email", "list_emails", "read_email"],
    status: "ready",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
            name: "email-mcp-server",
            version: "1.0.0",
          },
        },
      });
    }

    if (body.method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            {
              name: "send_email",
              description: "Send an email to a specified recipient",
              inputSchema: {
                type: "object",
                properties: {
                  to: {
                    type: "string",
                    description: "Recipient email address",
                  },
                  subject: {
                    type: "string",
                    description: "Email subject",
                  },
                  content: {
                    type: "string",
                    description: "Email content/body",
                  },
                },
                required: ["to", "subject", "content"],
              },
            },
          ],
        },
      });
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