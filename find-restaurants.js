const https = require('https');

const restaurantSearches = [
  { name: 'Xavier Pellicer Barcelona', urls: ['https://xavierpellicer.cat', 'https://xavierppellicer.com'] },
  { name: 'Taberna Noroeste Barcelona', urls: ['https://tabernaocueste.es', 'https://tabernaocueste.com'] },
  { name: 'CRUIX Barcelona', urls: ['https://crucixbar.com', 'https://cruixbarcelona.com'] },
];

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { rejectUnauthorized: false, timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => {
      resolve({ url, status: 'error' });
    });
  });
}

async function main() {
  console.log('🔍 Buscando webs de restaurantes...\n');

  for (const rest of restaurantSearches) {
    console.log(`${rest.name}:`);
    for (const url of rest.urls) {
      const result = await testUrl(url);
      const status = result.status === 200 ? '✅' : '❌';
      console.log(`  ${status} ${url}`);
    }
    console.log('');
  }

  console.log('\n💡 INSTRUCCIONES:');
  console.log('Si conoces la URL correcta de algún restaurante, la usamos para scrapear imágenes');
  console.log('\nEjemplo (como Mineral):');
  console.log('https://www.mineralbcn.com/uploads/gallery/ef6a0a10-15f4-4c88-b1b9-712546663ed6.webp');
}

main();
