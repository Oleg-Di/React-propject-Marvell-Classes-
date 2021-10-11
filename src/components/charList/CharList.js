import { useState, useEffect, useRef } from "react";
import "./charList.scss";
import MarvelService from "./../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
const CharList =(props) => {
  
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)
  
 const marvelService = new MarvelService();

  useEffect(() => {
    onRequest()
  }, [])

  const onError = () => {
    setError(true)
    setLoading(false)
  };

 const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(loading =>  false)
    setNewItemLoading(false)
    setOffset(offset => offset + 9)
    setCharEnded(ended)
  };

 const onCharListLoading = () => {
    
      setNewItemLoading(true)
    
  };

 const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const itemRefs = useRef([])
 
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
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <ListView
              onCharSelected={props.onCharSelected}
              chars={charList}
              itemRefs={itemRefs}
              focusOnItem={focusOnItem}
            />
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
  }

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
      <li
        ref={el => props.itemRefs.current[i]=el}
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
        key={char.id}
        className="char__item"
      >
        <img src={thumbnail} style={imgStyle} alt="abyss" />
        <div className="char__name">{name}</div>
      </li>
    );
  });
  return <>{list}</>;
};
export default CharList;
