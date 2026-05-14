import axios from "axios";
import * as cheerio from "cheerio";

async function testScrape(url: string) {
  console.log(`\n--- Test de Conexión a: ${url} ---`);
  
  try {
    const startTime = Date.now();
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'Connection': 'keep-alive'
      },
      timeout: 10000
    });
    
    const duration = Date.now() - startTime;
    console.log(`✅ Conexión exitosa (${duration}ms)`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    const $ = cheerio.load(response.data);
    const title = $("title").text();
    console.log(`📄 Título detectado: ${title}`);
    
    const sections = $(".et_pb_section").length;
    console.log(`📦 Secciones de Divi encontradas: ${sections}`);
    
    if (sections > 0) {
      console.log("\n🚀 ¡Éxito! El sistema puede leer la página correctamente.");
    } else {
      console.log("\n⚠️  Conectado, pero no se encontraron secciones de Divi. ¿Es la URL correcta?");
    }

  } catch (err: any) {
    console.log(`\n❌ Error de conexión:`);
    if (err.response) {
      console.log(`   Status: ${err.response.status}`);
      console.log(`   Data: ${JSON.stringify(err.response.data).substring(0, 200)}...`);
    } else {
      console.log(`   Mensaje: ${err.message}`);
    }
    console.log("\n💡 Sugerencia: Comprueba que no haya un firewall bloqueando la petición o que la URL sea accesible desde el navegador.");
  }
}

const target = process.argv[2];
if (!target) {
  console.log("Uso: npx tsx scripts/test-connection.ts <URL>");
} else {
  testScrape(target);
}
