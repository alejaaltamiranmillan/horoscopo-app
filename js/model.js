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
    const date = new Date(fecha);
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

  async getHoroscopo(fecha) {
    try {
      const signo = this.getSigno(fecha);
      const emoji = this.ZODIAC_SIGNS[signo];

      const url = `${this.API_URL}?sign=${signo}`;
      const response = await fetch(url, {
        mode: "cors",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        horoscope: data.horoscope,
        sign: signo,
        emoji: emoji
      };
    } catch (error) {
      console.error("Error al obtener el horóscopo:", error);
      return null;
    }
  }
}