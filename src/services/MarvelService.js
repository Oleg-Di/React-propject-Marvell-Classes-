import { useHttp } from "./../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=47a77402841c98472c249c0d0f06ec7d";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
}
  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };
  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };
  const getComicById = async (id) => {
    const res = await request(`${_apiBase}characters/${id}/comics?${_apiKey}`);
    const newRes = res.data.results.slice(0, 9)
    return  newRes.map(_transformComicById) 
  }
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const _transformComicById = (comics) => {
    return {
      id: comics.id,
      title: comics.title
    }
  }
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      price: comics.prices[0].price,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      pages: comics.pageCount,
      description: comics.description ? (
        `${comics.description.slice(0, 210)}...`
      ) : (
        <span>There is no discription...</span>
      ),
    };
  };
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? (
        `${char.description.slice(0, 210)}...`
      ) : (
        <span>There is no discription...</span>
      ),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items ? char.comics.items.slice(0, 9) : null,
    };
  };
  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
    getComicById,
    getCharacterByName
  };
};

export default useMarvelService;
