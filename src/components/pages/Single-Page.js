import { useParams} from 'react-router'
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect } from "react";

import './singleComic.scss'
import { useRef } from 'react/cjs/react.development';
import AppBanner from '../appBanner/AppBanner';





const SinglePage = ({Component, type}) => {
const {id}= useParams();
const [pageData, setPage] = useState(null);
const isMounted = useRef(true)
const { loading, error, getComics, clearError, getCharacter} = useMarvelService();

useEffect(() => {
  if(isMounted) {
    ChoosePage();
  }
  return () => isMounted.current = false
    
  }, [id]);

  const ChoosePage = () => {
    clearError()
    switch (type) {
      case 'character':
        getCharacter(id).then(onPageLoading);
        break;
      case 'comic':
        getComics(id).then(onPageLoading);
        break;
        default :
        console.log(type);
    }
    
  };
  const onPageLoading = (data) => {
    setPage(data);
  };
//   const skeleton = comic || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !pageData) ? (
    <Component data={pageData} />
  ) : null;
  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};


export default SinglePage