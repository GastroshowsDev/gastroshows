import "dotenv/config";

const keyB64 = process.env.REDSYS_SECRET_KEY || "";
if (!keyB64) {
  console.log("Error: REDSYS_SECRET_KEY no está definida en el .env");
} else {
  const decoded = Buffer.from(keyB64, "base64");
  console.log(`Longitud de la clave decodificada: ${decoded.length} bytes`);
  if (decoded.length !== 24) {
    console.log("AVISO: Redsys espera exactamente 24 bytes para el cifrado 3DES.");
    if (decoded.length === 32) {
      console.log("Parece que tienes una clave de 32 bytes (256 bits).");
    }
  } else {
    console.log("La longitud es correcta (24 bytes).");
  }
}
