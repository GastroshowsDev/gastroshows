const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/';

https.get(url, { rejectUnauthorized: false }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);

    // Extraer el contenido principal
    const main = $('.site-main, main, article').first();

    let htmlContent = '';

    // Procesar cada elemento dentro del main
    main.find('.post-content, .entry-content, .content-area > div').first().html((index, html) => {
      htmlContent = html;
      return html;
    });

    // Si no encontró, intenta otra selector
    if (!htmlContent) {
      htmlContent = main.html();
    }

    // Guardar HTML limpio
    fs.writeFileSync(
      'C:\\Users\\mcgri\\Downloads\\sc-data\\page-full-content.html',
      htmlContent
    );

    console.log('✅ Contenido HTML completo extraído');
    console.log(`📊 Tamaño: ${htmlContent.length} caracteres`);
    console.log('📁 Guardado en: page-full-content.html');
  });
}).on('error', err => console.error('❌ Error:', err.message));
