import House from '../models/House';
import imagesView from './images_view';

export default {
  render(house: House) {
    return {
      id: house.id,
      proprietario: house.proprietario,
      latitude: house.latitude,
      longitude: house.longitude,
      descricao: house.descricao,
      whatsapp: house.whatsapp,
      valor: house.valor,
      images: imagesView.renderMany(house.images)
    };
  },

  renderMany(houses: House[]) {
    return houses.map(house => this.render(house));
  }
};