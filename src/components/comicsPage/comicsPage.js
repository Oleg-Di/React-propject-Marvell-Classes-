import { Route } from "react-router"
import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList"
import SingleComic from "../singleComic/SingleComic"



export const ComicsPage = ({ onComicsSelected, comicsId}) => {


    return (
        <>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected}/>
            
            {/* <SingleComic comicsId={comicsId}/> */}
        </>
    )
}