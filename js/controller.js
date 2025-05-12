import Model from './model.js';
import View from './view.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.fechaInput.addEventListener('input', () => {
      const fechaValida = this.view.validarFecha(this.view.fechaInput.value);
      this.view.consultarBtn.disabled = !fechaValida;
    });

    this.view.consultarBtn.addEventListener('click', () => {
      const fecha = this.view.fechaInput.value;
      const signo = this.model.getSigno(fecha);
      const horoscopo = this.model.getHoroscopo(signo);
      const emoji = this.getEmoji(signo);
      this.view.mostrarHoroscopo(horoscopo, emoji);

      setTimeout(() => {
        this.view.ocultarHoroscopo(() => {
          this.view.habilitarBoton();
        });
      }, 15000);
    });
  }

}