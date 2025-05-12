export default class View {
  constructor() {
    this.fechaInput = document.getElementById('fechaInput');
    this.consultarBtn = document.getElementById('consultarBtn');
    this.resultado = document.getElementById('resultado');
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
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(fecha);
  }
}