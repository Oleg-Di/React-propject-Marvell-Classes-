import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./charInfo.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import { Link } from "react-router-dom";
import { useRef } from "react/cjs/react.development";

const CharInfo = (props) => {
  const [state, setState] = useState({
    char: null,
  });
  
  const [comicState, setComicState] = useState({
    comic: null
  })
  const isMounted = useRef(true)
  const { loading, error, getCharacter, clearError, getComicById } = useMarvelService();

  useEffect(() => {
    if (isMounted) {
      updateChar();
    }
    return () => isMounted.current = false

  }, [props.charId]);
 
  const updateChar = () => {
    clearError();
    const { charId } = props;
    if (!charId) {
      return;
    }
    getComicById(charId).then(onComicLoaded);
    getCharacter(charId).then(onCharLoaded);
  };
  const onComicLoaded = (comic) => {
    setComicState({comic})
  }
  const onCharLoaded = (char) => {
    setState({ char });
  };

  const { char } = state;
  const {comic} = comicState;

  const skeleton = char || loading || error  ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char || !comic) ? <View char={char} comic={comic}/> : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char, comic }) => {
  const { name, description, thumbnail, homepage, wiki} = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comic.length > 0 ? null : "There is no comics with this character..."}
        {comic.map((item, i) => (
          <li  key={i} className="char__comics-item">
            <Link to={`comics/${item.id}`}>
            {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
