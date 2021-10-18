import { useState, useEffect, useRef } from "react";
import "./charList.scss";
import useMarvelService from "./../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { error, loading, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
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
    <div className="char__list">
      <ul className="char__grid">
        {loading && !newItemLoading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <TransitionGroup component={null}>
            <ListView
              onCharSelected={props.onCharSelected}
              chars={charList}
              itemRefs={itemRefs}
              focusOnItem={focusOnItem}
            />
          </TransitionGroup>
        )}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{
          display: charEnded ? "none" : "block",
        }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const ListView = (props) => {
  const list = props.chars.map((char, i) => {
    const { name, thumbnail } = char;
    let imgStyle = { objectFit: "cover" };
    if (
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "contain" };
    }
    return (
      <CSSTransition
        key={char.id}
        timeout={500}
        classNames="char__item"
        in={true}
      >
        <li
          ref={(el) => (props.itemRefs.current[i] = el)}
          tabIndex={0}
          onClick={() => {
            props.onCharSelected(char.id);
            props.focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(char.id);
              props.focusOnItem(i);
            }
          }}
          className="char__item"
        >
          <img src={thumbnail} style={imgStyle} alt="abyss" />
          <div className="char__name">{name}</div>
        </li>
      </CSSTransition>
    );
  });
  return <>{list}</>;
};
export default CharList;
