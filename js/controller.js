import Model from './model.js';
import View from './view.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.fechaInput.addEventListener('change', () => {
      const fechaValida = this.view.validarFecha(this.view.fechaInput.value);
      this.view.consultarBtn.disabled = !fechaValida;
    });

    this.view.consultarBtn.addEventListener('click', async () => {
      try {
        const fechaISO = this.view.fechaInput.value;
        const fechaFormateada = this.view.formatearFecha(fechaISO);
        const signo = this.model.getSigno(fechaFormateada);
        const emoji = this.model.getEmoji(signo);
        
        const horoscopo = await this.model.getHoroscopo(signo);
        this.view.mostrarHoroscopo(horoscopo, emoji);

        setTimeout(() => {
          this.view.ocultarHoroscopo(() => {
            this.view.habilitarBoton();
          });
        }, 15000);
      } catch (error) {
        console.error('Error:', error);
        this.view.mostrarHoroscopo(
          "Ha ocurrido un error al consultar tu horóscopo. Por favor, intenta nuevamente.", 
          "⚠️"
        );
        setTimeout(() => {
          this.view.ocultarHoroscopo(() => {
            this.view.habilitarBoton();
          });
        }, 3000);
      }
    });
  }
}