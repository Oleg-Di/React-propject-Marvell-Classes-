import { useState } from "react";


import ErrorBoundary from "../errorBoundary/Error.Boundary";


import { ComicsPage } from "../comicsPage/comicsPage";

const ComicsStore = () => {
    const [selectedComics, setComics] = useState(null);

    const onComicsSelected = (id) => {
      setComics(id);
    };

    return(
        <ErrorBoundary>
        <ComicsPage
          comicsId={selectedComics}
          onComicsSelected={onComicsSelected}
        />
      </ErrorBoundary>
    )
}

export default ComicsStore;