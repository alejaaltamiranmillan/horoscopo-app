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

    this.view.consultarBtn.addEventListener('click', async () => {
      const fecha = this.view.fechaInput.value;
      const signo = this.model.getSigno(fecha);
      const emoji = this.model.getEmoji(signo);
      
      try {
        const horoscopo = await this.model.getHoroscopo(signo);
        this.view.mostrarHoroscopo(horoscopo, emoji);

        setTimeout(() => {
          this.view.ocultarHoroscopo(() => {
            this.view.habilitarBoton();
          });
        }, 15000);
      } catch (error) {
        console.error(error);
        this.view.mostrarHoroscopo("Error al obtener el horóscopo", "⚠️");
      }
    });
  }
}