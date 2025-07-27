export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🌤️ MCP Weather Server
        </h1>
        <p className="text-gray-600 mb-4">
          Servidor MCP para obtener información del clima usando la integración
          de Vercel.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h2 className="font-semibold text-blue-900 mb-2">
            Herramientas disponibles:
          </h2>
          <ul className="text-sm text-blue-800">
            <li>
              • <code>fetch_weather</code> - Obtener el clima de una ciudad
            </li>
          </ul>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>
            Endpoint MCP: <code>/api/mcp</code>
          </p>
        </div>
      </div>
    </div>
  );
}
