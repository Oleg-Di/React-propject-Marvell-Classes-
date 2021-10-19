import "./singleComic.scss";
import { useState } from "react";
import useMarvelService from "./../../services/MarvelService";
import { useEffect } from "react/cjs/react.development";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SingleComic = ({ comicsId }) => {
  const [comics, setComics] = useState(null);
  const { loading, error, getComics} = useMarvelService();

  useEffect(() => {
    ChooseComic();
  }, [comicsId]);

  const ChooseComic = () => {
    if (!comicsId) {
      return;
    }

    getComics(comicsId).then(onComicsLoading);
  };
  const onComicsLoading = (comics) => {
    setComics(comics);
  };
  const skeleton = comics || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comics) ? (
    <View comics={comics} />
  ) : null;
  return (
    <>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};
const View = ({ comics }) => {
  const { title, description, thumbnail, price, pages } = comics;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <div className="single-comic">
      <img
        style={imgStyle}
        src={thumbnail}
        alt="x-men"
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pages} pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <a href="#" className="single-comic__back">
        Back to all
      </a>
    </div>
  );
};

export default SingleComic;
