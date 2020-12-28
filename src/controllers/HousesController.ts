import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import houseView from '../views/houses_view';
import House from '../models/House';

export default {
  async index(request: Request, response: Response) {
    const housesRepository = getRepository(House);

    const houses = await housesRepository.find({
      relations: ['images']
    });

    return response.json(houseView.renderMany(houses));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const housesRepository = getRepository(House);

    const house = await housesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(houseView.render(house));
  },

  async create(request: Request, response: Response) {
    const {
      proprietario,
      latitude,
      longitude,
      descricao,
      whatsapp,
      valor,
    } = request.body;
  
    const housesRepository = getRepository(House);

    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      proprietario,
      latitude,
      longitude,
      descricao,
      whatsapp,
      valor,
      images
    };

    const schema = Yup.object().shape({
      proprietario: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      descricao: Yup.string().required().max(300),
      whatsapp: Yup.string().required(),
      valor: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
     });

     await schema.validate(data, {
       abortEarly: false,
     });

    const house = housesRepository.create(data);
  
    await housesRepository.save(house);
  
    return response.status(201).json(house);
  }
};