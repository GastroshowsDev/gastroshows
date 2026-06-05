const https = require('https');
const cheerio = require('cheerio');

const restaurants = [
  {
    name: 'Xavier Pellicer',
    url: 'https://xavierpellicer.com',
  },
  {
    name: 'Taberna Noroeste',
    url: 'https://tabernanocueste.es',
  },
  {
    name: 'CRUIX',
    url: 'https://restaurantcruix.com',
  },
  {
    name: 'La Tartarería',
    url: 'https://latartareria.com',
  },
  {
    name: 'Mineral',
    url: 'https://mineralbarcelona.com',
  },
];

async function scrapeImages(url, name) {
  return new Promise((resolve) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const images = [];

          // Buscar imágenes en la página
          $('img').each((i, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            const alt = $(el).attr('alt');
            if (src && !src.includes('logo') && !src.includes('icon') && i < 5) {
              const fullUrl = src.startsWith('http') ? src : new URL(src, url).href;
              images.push({ src: fullUrl, alt: alt || name });
            }
          });

          console.log(`✅ ${name}: ${images.length} imágenes encontradas`);
          images.forEach((img, i) => {
            console.log(`   [${i + 1}] ${img.src}`);
          });

          resolve({ name, images });
        } catch (e) {
          console.log(`❌ Error en ${name}: ${e.message}`);
          resolve({ name, images: [] });
        }
      });
    }).on('error', (err) => {
      console.log(`❌ No se pudo acceder a ${name}: ${err.message}`);
      resolve({ name, images: [] });
    });
  });
}

async function main() {
  console.log('🔍 Buscando imágenes de restaurantes...\n');

  for (const rest of restaurants) {
    await scrapeImages(rest.url, rest.name);
    await new Promise(r => setTimeout(r, 1000)); // Espera entre requests
  }

  console.log('\n✅ Escaneo completado');
  console.log('\nUSO: Copia las URLs encontradas y úsalas en la página');
}

main();
