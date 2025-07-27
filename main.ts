import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import axios from "axios";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const handler = createMcpHandler((server: any) => {
  server.tool(
    "fetch_weather",
    "Fetch the weather for a given city",
    {
      city: z.string().describe("The city to fetch the weather for"),
    },
    async ({ city }: { city: string }) => {
      try {
        console.error(`Fetching weather for: ${city}`);

        // Paso 1: Obtener coordenadas usando geocoding-api
        const geocodingResponse = await axios.get(GEOCODING_API_URL, {
          params: {
            name: city,
            count: 1,
            language: "es",
            format: "json",
          },
        });

        const geocodingData = geocodingResponse.data;

        if (!geocodingData.results || geocodingData.results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Ciudad no encontrada: "${city}". Por favor, verifica el nombre de la ciudad e intenta nuevamente.`,
              },
            ],
          };
        }

        const location = geocodingData.results[0];
        const { latitude, longitude, name, country } = location;

        // Paso 2: Obtener datos del clima usando las coordenadas
        const weatherResponse = await axios.get(WEATHER_API_URL, {
          params: {
            latitude,
            longitude,
            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
            timezone: "auto",
          },
        });

        const weatherData = weatherResponse.data;
        const current = weatherData.current;

        // Convertir código del clima a descripción
        const weatherDescriptions: { [key: number]: string } = {
          0: "Cielo despejado",
          1: "Mayormente despejado",
          2: "Parcialmente nublado",
          3: "Nublado",
          45: "Niebla",
          48: "Niebla con escarcha",
          51: "Llovizna ligera",
          53: "Llovizna moderada",
          55: "Llovizna intensa",
          61: "Lluvia ligera",
          63: "Lluvia moderada",
          65: "Lluvia intensa",
          71: "Nieve ligera",
          73: "Nieve moderada",
          75: "Nieve intensa",
          95: "Tormenta",
        };

        const weatherDescription =
          weatherDescriptions[current.weather_code] || "Condición desconocida";

        const weatherInfo = `🌤️ **Clima en ${name}, ${country}**

🌡️ **Temperatura:** ${current.temperature_2m}°C
🌡️ **Sensación térmica:** ${current.apparent_temperature}°C
💧 **Humedad:** ${current.relative_humidity_2m}%
🌬️ **Velocidad del viento:** ${current.wind_speed_10m} km/h
☁️ **Condición:** ${weatherDescription}

*Información proporcionada por Open-Meteo*`;

        return {
          content: [
            {
              type: "text",
              text: weatherInfo,
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching weather:", error);

        return {
          content: [
            {
              type: "text",
              text: `❌ Error al obtener el clima para "${city}": ${
                error instanceof Error ? error.message : "Error desconocido"
              }`,
            },
          ],
        };
      }
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };
