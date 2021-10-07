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
  };

  marvelService = new MarvelService();
  onCharsLoaded = (chars) => {
    this.setState({ chars, loading: false, error: false });
    console.log(chars);
  };
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };
  componentDidMount() {
    this.updateChars();
  }

  render() {
    const { chars, loading, error } = this.state;
    return (
      <div className="char__list">
        <ul className="char__grid">
            {loading ?  <Spinner/> : error? <ErrorMessage/> : <ListView onCharSelected={this.props.onCharSelected} chars={chars}/>}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
const ListView = (props) => {
    
    const list =  props.chars.map(char => {
        const {name, thumbnail} = char
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }
        return(
            <li onClick={()=> props.onCharSelected(char.id)} key={char.id} className="char__item">
            <img src={thumbnail} style={imgStyle} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
        )
    })
  return (
      <>
      {list}
      </> 
  );
};
export default CharList;
