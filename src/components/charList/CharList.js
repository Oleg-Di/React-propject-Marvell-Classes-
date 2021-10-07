import { Component } from "react";
import "./charList.scss";
import MarvelService from "./../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length < 9) {
      ended = true
    }


    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }));
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.onRequest();
  }

  render() {
    const { chars, loading, error, newItemLoading, offset, charEnded } = this.state;
    return (
      <div className="char__list">
        <ul className="char__grid">
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <ListView
              onCharSelected={this.props.onCharSelected}
              chars={chars}
            />
          )}
        </ul>
        <button 
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{
          display: charEnded ? 'none' : 'block'
        }}
        onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
const ListView = (props) => {
  const list = props.chars.map((char) => {
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
        onClick={() => props.onCharSelected(char.id)}
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
