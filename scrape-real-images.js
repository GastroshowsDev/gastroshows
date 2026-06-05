const https = require('https');
const cheerio = require('cheerio');

const restaurants = [
  {
    name: 'Mineral',
    url: 'https://www.mineralbcn.com/',
  },
  {
    name: 'Xavier Pellicer',
    url: 'https://xavierpellicerrestaurante.com/',
  },
  {
    name: 'Taberna Noroeste',
    url: 'https://tabernanocueste.com/',
  },
  {
    name: 'CRUIX',
    url: 'https://restaurantcruix.com/',
  },
  {
    name: 'La Tartarería',
    url: 'https://latartareria.es/',
  },
];

function scrapeRestaurantImages(url, name) {
  return new Promise((resolve) => {
    const httpsModule = url.startsWith('https') ? https : require('http');

    httpsModule.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const images = [];
          const baseUrl = new URL(url).origin;

          // Buscar imágenes en diferentes selectores
          $('img').each((i, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            const alt = $(el).attr('alt');

            if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('footer')) {
              let fullUrl = src;

              if (src.startsWith('/')) {
                fullUrl = baseUrl + src;
              } else if (!src.startsWith('http')) {
                fullUrl = baseUrl + '/' + src;
              }

              images.push({ src: fullUrl, alt: alt || name });
            }
          });

          // Eliminar duplicados y limitar a 3
          const unique = [];
          const seen = new Set();
          images.forEach(img => {
            if (!seen.has(img.src) && unique.length < 3) {
              unique.push(img);
              seen.add(img.src);
            }
          });

          console.log(`✅ ${name}: ${unique.length} imágenes`);
          unique.forEach((img, i) => {
            console.log(`   [${i + 1}] ${img.src}\n`);
          });

          resolve({ name, images: unique });
        } catch (e) {
          console.log(`⚠️  Error procesando ${name}: ${e.message}`);
          resolve({ name, images: [] });
        }
      });
    }).on('error', (err) => {
      console.log(`❌ ${name} - No accesible: ${err.message}`);
      resolve({ name, images: [] });
    });
  });
}

async function main() {
  console.log('🔍 Extrayendo imágenes de webs de restaurantes...\n');

  const results = [];
  for (const rest of restaurants) {
    const result = await scrapeRestaurantImages(rest.url, rest.name);
    results.push(result);
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log('\n📋 RESUMEN DE IMÁGENES ENCONTRADAS:\n');
  results.forEach(r => {
    console.log(`${r.name}:`);
    if (r.images.length > 0) {
      r.images.forEach((img, i) => {
        console.log(`  [${i + 1}] ${img.src}`);
      });
    } else {
      console.log('  (No se encontraron imágenes)');
    }
    console.log('');
  });
}

main();
