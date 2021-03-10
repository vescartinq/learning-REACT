export const getGifs = async (category) => {
  const apiUrl = 'api.giphy.com/v1/gifs';
  const apiKey = 'HPqG9gDBAf3Yu78aQYSjVQp1XvmOPRCV';
  const limitGifs = 20;

  // encodeURI elimina espacios del input por + para la url
  const url = `https://${apiUrl}/search?q=${encodeURI(
    category
  )}&limit=${limitGifs}&api_key=${apiKey}`;

  const resp = await fetch(url);
  const { data } = await resp.json();

  const gifs = data.map((img) => {
    return {
      id: img.id,
      title: img.title,
      url: img.images?.downsized_medium.url,
    };
  });

  return gifs;
};
