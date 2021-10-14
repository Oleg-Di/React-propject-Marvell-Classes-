import { useParams} from 'react-router'
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect } from "react";

import './singleComic.scss'
import { Link } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';





const SingleComics = () => {
const {comicId}= useParams();
const [comic, setComic] = useState(null);
const isMounted = useRef(true)
const { loading, error, getComics, clearError} = useMarvelService();

useEffect(() => {
  if(isMounted) {
    ChooseComic();
  }
  return () => isMounted.current = false
    
  }, [comicId]);

  const ChooseComic = () => {
    clearError()

    getComics(comicId).then(onComicsLoading);
  };
  const onComicsLoading = (comics) => {
    setComic(comics);
  };
//   const skeleton = comic || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? (
    <View comics={comic} />
  ) : null;
  return (
    <>
      {/* {skeleton} */}
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
      <Link to='/comics'>
        Back to all
      </Link>
    </div>
  );
};
export default SingleComics