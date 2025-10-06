import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import axios from "axios";

import nodemailer from "nodemailer";

// Mock email storage for demo purposes (in production, use a real email service/database)
const mockEmailStorage: Array<{
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
}> = [
  {
    id: "1",
    from: "demo@example.com",
    to: "user@example.com",
    subject: "Welcome to Email MCP Demo",
    content:
      "This is a demo email to showcase the MCP email functionality. You can read and send emails through this MCP server.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    from: "notifications@example.com",
    to: "user@example.com",
    subject: "MCP Server Status Update",
    content:
      "Your MCP server is running successfully! This email demonstrates the email receiving functionality.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
  },
];

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "fetch_weather",
      "Fetch the weather for a given city",
      {
        city: z.string().describe("The city to fetch the weather for"),
      },
      async (args) => {
        const { city } = args;
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
            weatherDescriptions[current.weather_code] ||
            "Condición desconocida";

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

    // Tool to send emails
    server.tool(
      "send_email",
      "Send an email to a specified recipient",
      {
        to: z.string().email().describe("Recipient email address"),
        subject: z.string().describe("Email subject"),
        content: z.string().describe("Email content/body"),
        from: z
          .string()
          .email()
          .optional()
          .describe(
            "Sender email address (optional, defaults to demo@example.com)"
          ),
      },
      async (args) => {
        const { to, subject, content, from = "demo@example.com" } = args;

        try {
          console.log(`Sending email to: ${to}`);

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const emailInfo = {
            from: from,
            to: to,
            subject: subject,
            text: content,
            html: `<p>${content.replace(/\n/g, "<br>")}</p>`,
          };

          await transporter.sendMail(emailInfo);

          // For demo, we'll just simulate the email send
          console.log("Email would be sent to:", to);

          // Add to our mock storage as a "sent" email
          const sentEmail = {
            id: Date.now().toString(),
            from: from,
            to: to,
            subject: subject,
            content: content,
            timestamp: new Date(),
            read: true, // Mark as read since it's sent
          };

          const emailResult = `✅ **Email Sent Successfully!**
  
  📧 **To:** ${to}
  👤 **From:** ${from}
  📋 **Subject:** ${subject}
  📝 **Content:** ${content}
  ⏰ **Sent at:** ${sentEmail.timestamp.toLocaleString()}
  
  *This is a demo email service. In production, this would use a real SMTP server or email service.*`;

          return {
            content: [
              {
                type: "text",
                text: emailResult,
              },
            ],
          };
        } catch (error) {
          console.error("Error sending email:", error);

          return {
            content: [
              {
                type: "text",
                text: `❌ Error sending email to "${to}": ${
                  error instanceof Error ? error.message : "Unknown error"
                }`,
              },
            ],
          };
        }
      }
    );
  },
  {},
  { basePath: "/api" }
);

// Manejador OPTIONS para CORS
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export { handler as GET, handler as POST, handler as DELETE };
