const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

// URLs principales de Search Console (primeras 50 con tráfico)
const urls = [
  'https://gastroshows.es/',
  'https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/',
  'https://gastroshows.es/cena-clandestina-5/',
  'https://gastroshows.es/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/',
  'https://gastroshows.es/los-mejores-menus-degustacion-para-regalar/',
  'https://gastroshows.es/cenas-espectaculo-barcelona-secreta/',
  'https://gastroshows.es/bares-tapas-barcelona-baratos/',
  'https://gastroshows.es/receta-de-fricando-de-ternera/',
  'https://gastroshows.es/regalo-experiencia-gastronomica/',
  'https://gastroshows.es/cheap-tapas-bars-in-barcelona/',
  'https://gastroshows.es/the-best-restaurants-with-tasting-menu-in-barcelona/',
  'https://gastroshows.es/alquiler-espacio-gastronomico-en-barcelona/',
  'https://gastroshows.es/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/',
  'https://gastroshows.es/tarjeta-regalo-cena-barcelona/',
  'https://gastroshows.es/hacer-algo-diferente-en-barcelona/',
  'https://gastroshows.es/tarjeta-regalo-cena-para-dos/',
  'https://gastroshows.es/mejores-restaurantes-cocina-tradicional-catalana-barcelona/',
  'https://gastroshows.es/restaurantes-playa-barcelona/',
  'https://gastroshows.es/cena-original-en-barcelona/',
  'https://gastroshows.es/cena-secreta/',
  'https://gastroshows.es/taller-cocteles-barcelona/',
  'https://gastroshows.es/team-building-masterchef/',
  'https://gastroshows.es/taller-de-sushi-barcelona/',
  'https://gastroshows.es/potenciador-de-sabor-glutamato/',
  'https://gastroshows.es/cenas-privadas-barcelona/',
  'https://gastroshows.es/receta-de-caballa-marinada/',
  'https://gastroshows.es/regalos-originales-barcelona-experiencias/',
  'https://gastroshows.es/las-mejores-cenas-clandestinas-de-barcelona/',
  'https://gastroshows.es/clandestine-dinner-barcelona/',
  'https://gastroshows.es/la-merce-2025-barcelona-guia-completa/',
  'https://gastroshows.es/las-mejores-terrazas-de-barcelona/',
  'https://gastroshows.es/sushi-workshop-barcelona/',
  'https://gastroshows.es/mejores-menus-del-dia-de-barcelona/',
  'https://gastroshows.es/gift-card/',
  'https://gastroshows.es/estopa-piromusical-barcelona-merce-2025/',
  'https://gastroshows.es/cosas-que-hacer-con-tu-pareja-en-casa/',
  'https://gastroshows.es/the-best-tasting-menus-for-gift-giving/',
  'https://gastroshows.es/the-best-cocktail-bars-in-barcelona-2/',
  'https://gastroshows.es/cena-creativa-en-casa/',
  'https://gastroshows.es/cena-clandestina-de-barcelona-grupos/',
  'https://gastroshows.es/the-best-clandestine-dinners-in-barcelona/',
  'https://gastroshows.es/3-gastronomic-space-for-rent-in-barcelona/',
  'https://gastroshows.es/actividades-gastronomicas/',
  'https://gastroshows.es/cena-con-show-en-vivo/',
  'https://gastroshows.es/team-building-cocina-barcelona/',
  'https://gastroshows.es/talleres-gastronomicos/',
  'https://gastroshows.es/regalos-originales-en-pareja/',
  'https://gastroshows.es/planes-para-halloween-castanyada-en-barcelona/',
  'https://gastroshows.es/regalos-con-comida/',
  'https://gastroshows.es/veal-fricando-recipe/'
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const h1 = $('h1').first().text().trim();
          const h2s = [];
          $('h2').each((i, el) => {
            const text = $(el).text().trim();
            if (text) h2s.push(text);
          });
          const metaDesc = $('meta[name="description"]').attr('content') || '';
          const title = $('title').text();

          resolve({
            url,
            h1,
            h2s,
            metaDesc,
            title,
            status: res.statusCode
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function scrapeAll() {
  const results = [];
  console.log(`\n🔍 Scrapeando ${urls.length} páginas de gastroshows.es...\n`);

  for (let i = 0; i < urls.length; i++) {
    try {
      const result = await fetchPage(urls[i]);
      results.push(result);
      console.log(`✅ [${i + 1}/${urls.length}] ${result.url}`);
      console.log(`   H1: ${result.h1}`);
      console.log(`   H2s: ${result.h2s.length} encontrados\n`);

      // Esperar 500ms entre requests para no sobrecargar
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`❌ Error en ${urls[i]}: ${err.message}`);
    }
  }

  // Guardar resultados como JSON
  fs.writeFileSync(
    'c:\\Users\\mcgri\\Downloads\\sc-data\\gastroshows-structure.json',
    JSON.stringify(results, null, 2)
  );

  // Guardar como CSV también
  const csv = [
    'URL,H1,H2_COUNT,META_DESCRIPTION,TITLE'
  ];
  results.forEach(r => {
    const h2text = r.h2s.join(' | ');
    csv.push(`"${r.url}","${r.h1}",${r.h2s.length},"${r.metaDesc.replace(/"/g, '""')}","${r.title}"`);
  });
  fs.writeFileSync(
    'c:\\Users\\mcgri\\Downloads\\sc-data\\gastroshows-structure.csv',
    csv.join('\n')
  );

  console.log(`\n✅ Scrape completado!`);
  console.log(`📄 Resultados guardados en:`);
  console.log(`   - gastroshows-structure.json`);
  console.log(`   - gastroshows-structure.csv`);
}

scrapeAll();
