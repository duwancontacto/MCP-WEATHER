export async function GET() {
  return Response.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    status: "ok",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({
    message: "POST request received",
    data: body,
    timestamp: new Date().toISOString(),
  });
}
