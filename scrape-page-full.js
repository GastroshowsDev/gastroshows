const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/';

https.get(url, { rejectUnauthorized: false }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);

    // Extraer metadata
    const title = $('title').text();
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const h1 = $('h1').first().text().trim();

    // Extraer estructura de contenido
    const content = [];

    // Procesar main content
    const mainContent = $('.site-main, main, .content, article').first();

    // H2s y su contenido
    const h2s = [];
    mainContent.find('h2, h3, h4, p, ul, ol, img').each((i, el) => {
      const $el = $(el);
      const tag = el.name;
      let text = $el.text().trim();

      if (tag === 'h2') {
        h2s.push({
          level: 2,
          text,
          children: []
        });
      } else if (tag === 'h3') {
        if (h2s.length > 0) {
          h2s[h2s.length - 1].children.push({ level: 3, text });
        }
      } else if (tag === 'p' && text.length > 0) {
        if (h2s.length > 0) {
          h2s[h2s.length - 1].children.push({ level: 'p', text: text.substring(0, 200) });
        }
      } else if (tag === 'ul' || tag === 'ol') {
        const items = [];
        $el.find('li').each((j, li) => {
          items.push($(li).text().trim().substring(0, 150));
        });
        if (h2s.length > 0) {
          h2s[h2s.length - 1].children.push({ level: tag, items });
        }
      }
    });

    // Extraer interlinks
    const internalLinks = [];
    mainContent.find('a[href*="gastroshows.es"]').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text && !internalLinks.find(l => l.href === href)) {
        internalLinks.push({ text, href });
      }
    });

    // Guardar resultado
    const result = {
      url,
      title,
      metaDesc,
      h1,
      h2s,
      internalLinks,
      structure: {
        hasImages: mainContent.find('img').length > 0,
        hasTables: mainContent.find('table').length > 0,
        imageCount: mainContent.find('img').length,
        tableCount: mainContent.find('table').length
      }
    };

    fs.writeFileSync(
      'C:\\Users\\mcgri\\Downloads\\sc-data\\page-example-structure.json',
      JSON.stringify(result, null, 2)
    );

    console.log('✅ Contenido extraído');
    console.log(`📄 Título: ${title}`);
    console.log(`🎯 H1: ${h1}`);
    console.log(`📊 H2s: ${h2s.length}`);
    console.log(`🔗 Enlaces internos: ${internalLinks.length}`);
    console.log(`\n📁 Guardado en: page-example-structure.json`);
  });
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
});
