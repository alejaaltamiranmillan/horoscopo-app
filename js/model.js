export default class Model {
  constructor() {
    this.API_URL = "https://horoscopo-api.vercel.app/api/horoscope";
    this.ZODIAC_SIGNS = {
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
  }

  getSigno(fecha) {
    // Validar el formato de fecha
    if (!fecha || fecha.split('-').length !== 3) {
      throw new Error('Formato de fecha inválido');
    }

    const [day, month] = fecha.split('-').map(Number);
    
    // Validar día y mes
    if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 1 || month > 12) {
      throw new Error('Fecha inválida');
    }

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'tauro';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'geminis';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'escorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagitario';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricornio';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'acuario';
    return 'piscis';
  }

  getEmoji(signo) {
    return this.ZODIAC_SIGNS[signo] || '⭐';
  }

  async getHoroscopo(signo) {
    try {
      // Normalizar el signo antes de enviarlo
      const signoNormalizado = signo.toLowerCase().trim();
      
      // Verificar que el signo sea válido
      if (!this.ZODIAC_SIGNS[signoNormalizado]) {
        throw new Error('Signo zodiacal no válido');
      }

      const url = `${this.API_URL}?sign=${signoNormalizado}`;
      const response = await fetch(url, {
        mode: "cors",
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.horoscope;
    } catch (error) {
      console.error("Error al obtener el horóscopo:", error);
      return "Lo siento, no pude obtener tu horóscopo en este momento.";
    }
  }
}