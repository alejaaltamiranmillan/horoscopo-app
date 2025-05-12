export default class View {
  constructor() {
    this.fechaInput = document.getElementById('fechaInput');
    this.consultarBtn = document.getElementById('consultarBtn');
    this.resultado = document.getElementById('resultado');

    // Establecer fecha máxima como hoy
    const today = new Date().toISOString().split('T')[0];
    this.fechaInput.setAttribute('max', today);
    
    // Establecer fecha mínima (ejemplo: 100 años atrás)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    this.fechaInput.setAttribute('min', minDate.toISOString().split('T')[0]);
  }

  mostrarHoroscopo(horoscopo, emoji) {
    this.resultado.style.display = 'block';
    this.resultado.innerHTML = `<p>${emoji} ${horoscopo}</p>`;
    this.consultarBtn.disabled = true;
  }

  ocultarHoroscopo(callback) {
    this.resultado.classList.add('fade-out');
    setTimeout(() => {
      this.resultado.style.display = 'none';
      this.resultado.classList.remove('fade-out');
      callback();
    }, 1000);
  }

  habilitarBoton() {
    this.consultarBtn.disabled = false;
  }

  validarFecha(fecha) {
    if (!fecha) return false;
    const selectedDate = new Date(fecha);
    const today = new Date();
    return selectedDate <= today;
  }

  formatearFecha(fecha) {
    const [year, month, day] = fecha.split('-');
    return `${day}-${month}-${year}`;
  }
}