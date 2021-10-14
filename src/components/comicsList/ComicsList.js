import "./comicsList.scss";
import { useState } from "react";
import useMarvelService from "./../../services/MarvelService";
import { useEffect, useRef } from "react/cjs/react.development";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const ComicsList = (props) => {
  const [state, setState] = useState({
    comicsList: [],
    newItemLoading: false,
    offset: 210,
    comicsEnded: false,
  });

  const { error, loading, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(state.offset, true);
    console.log(state);
  }, []);

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setState({
      ...state,
      comicsList: [...state.comicsList, ...newComicsList],
      newItemLoading: false,
      offset: state.offset + 8,
      comicsEnded: ended,
    });
  };

  const onRequest = (offset = state.offset, initial) => {
    initial
      ? setState({ ...state, newItemLoading: false })
      : setState({ ...state, newItemLoading: true });

    getAllComics(state.offset).then(onComicsListLoaded);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => {
      item.classList.remove("char__item_selected");
      itemRefs.current[id].classList.add("char__item_selected");
      itemRefs.current[id].focus();
    });
  };

  return (
    <div className="comics__list">
      <ul className="comics__grid">
      {loading && !state.newItemLoading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage />
        ) :
        <ComicsListView
          onComicsSelected={props.onComicsSelected}
          comics={state.comicsList}
          itemRefs={itemRefs}
          focusOnItem={focusOnItem}
        />}
      </ul>
      <button onClick={onRequest} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const ComicsListView = (props) => {
  const list = props.comics.map((comics, i) => {
    const { title, thumbnail, price } = comics;
    let imgStyle = { objectFit: "cover" };
    if (
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "contain" };
    }
    return (
      <li
        className="comics__item"
        ref={(el) => (props.itemRefs.current[i] = el)}
        tabIndex={0}
        onClick={() => {
          props.onComicsSelected(comics.id);
          props.focusOnItem(i);
        }}
        onKeyPress={(e) => {
          if (e.key === " " || e.key === "Enter") {
            props.onCharSelected(comics.id);
            props.focusOnItem(i);
          }
        }}
        key={i}
        className="char__item"
      >
        <Link to={`/comics/${comics.id}`}>
          <img
            style={imgStyle}
            src={thumbnail}
            alt="ultimate war"
            className="comics__item-img"
          />
          <div style={{ color: "white" }} className="comics__item-name">
            {title}
          </div>
          <div style={{ color: "white" }} className="comics__item-price">
            Price: {price}$
          </div>
        </Link>
      </li>
    );
  });
  return <>{list}</>;
};

export default ComicsList;
