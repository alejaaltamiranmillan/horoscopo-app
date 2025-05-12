const API_URL = "https://horoscope-api-coral.vercel.app/api/horoscope";

const ZODIAC_SIGNS = {
  'aries': '🔥',
  'tauro': '🌱',
  'geminis': '🧠',
  'cancer': '💧',
  'leo': '🦁',
  'virgo': '📝',
  'libra': '⚖️',
  'escorpio': '🔮',
  'sagitario': '🏹',
  'capricornio': '⛰',
  'acuario': '💡',
  'piscis': '🌊'
};

function getZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'tauro';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'géminis';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cáncer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'escorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagitario';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricornio';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'acuario';
  return 'piscis';
}

export async function fetchHoroscope(birthdate) {
  try {
    const date = new Date(birthdate);
    const sign = getZodiacSign(date);
    const emoji = ZODIAC_SIGNS[sign];
    
    const url = `${API_URL}?sign=${sign}`; // Eliminado CORS_PROXY
    const response = await fetch(url, {
      mode: "cors",
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return {
      horoscope: data.horoscope,
      sign: sign,
      emoji: emoji
    };
  } catch (error) {
    console.error("Error al obtener el horóscopo:", error);
    return null;
  }
}