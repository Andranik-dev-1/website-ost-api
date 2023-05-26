import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dwz3qm4a0',
      api_key: '166636893353689',
      api_secret: 'Ridoreeq9hLHUcntPqp7NM-Ebuk',
    });
  },
};
