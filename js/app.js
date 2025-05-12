import Model from '/js/model.js';
import View from '/js/view.js';
import Controller from '/js/controller.js';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);