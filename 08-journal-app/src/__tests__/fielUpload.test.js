import cloudinary from 'cloudinary';

import { fileUpload } from '../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dwztn7vdz',
  api_key: '586118368971789',
  api_secret: 'FnGLulxDWhYM7EOxckgwWrOwLkc',
});

describe('Testing fileUpload', () => {
  test('should upload a file and return the url ', async () => {
    //elegir cualquier img de internet y copiar su url
    const resp = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    );
    // Blob-> elemento para archivar imagenes o archivos de gran tamaño
    const blob = await resp.blob();

    // Cargamos la imagen
    const file = new File([blob], 'foto.png');
    // Obtenemos la url
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Borrar imagen por ID para evitar imagen subida en cada test
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test('should return an error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
