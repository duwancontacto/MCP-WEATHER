import axios from "axios";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const OPENWEATHER_API_KEY =
  process.env.OPENWEATHER_API_KEY || "tu_api_key_aqui";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

async function testWeatherAPI() {
  try {
    console.log("🌤️ Probando la API de OpenWeatherMap...");
    console.log(
      "API Key configurada:",
      OPENWEATHER_API_KEY !== "tu_api_key_aqui" ? "✅ Sí" : "❌ No"
    );

    if (OPENWEATHER_API_KEY === "tu_api_key_aqui") {
      console.log("⚠️  Por favor, configura tu API key de OpenWeatherMap");
      console.log("1. Ve a https://openweathermap.org/");
      console.log("2. Crea una cuenta gratuita");
      console.log("3. Obtén tu API key");
      console.log("4. Configura la variable OPENWEATHER_API_KEY");
      return;
    }

    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: "Madrid",
        appid: OPENWEATHER_API_KEY,
        units: "metric",
        lang: "es",
      },
    });

    const weatherData = response.data;

    console.log("✅ API funcionando correctamente!");
    console.log(`🌤️ Clima en ${weatherData.name}, ${weatherData.sys.country}:`);
    console.log(`🌡️ Temperatura: ${weatherData.main.temp}°C`);
    console.log(`💧 Humedad: ${weatherData.main.humidity}%`);
    console.log(`☁️ Condición: ${weatherData.weather[0].description}`);
  } catch (error) {
    console.error("❌ Error al probar la API:", error.message);

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log(
        "🔑 Error: API key inválida. Verifica tu API key de OpenWeatherMap."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("🌍 Error: Ciudad no encontrada.");
    } else {
      console.log("🌐 Error de conexión. Verifica tu conexión a internet.");
    }
  }
}

testWeatherAPI();
