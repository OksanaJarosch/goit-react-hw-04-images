import { Searchbar } from "./Searchbar/Searchbar";
import { fetchPhotos } from "services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ThreeDots } from  'react-loader-spinner'
import css from "./App.module.css";
import { useEffect, useState } from "react";

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === "") {
      return
    }
    
    const handleFetch = async () => {

      setIsLoading(true);
      
      const { hits, totalHits } = await fetchPhotos(query, page);
      
      setGallery(prevImages => (
        [...prevImages, ...hits]
      ));
      setTotalPages(Math.ceil(totalHits / 12));
      setIsLoading(false);
    }
    
    try {
      handleFetch()

    } catch (error) {
      setError(error);
      setIsLoading(false);
    } 
  },
    [query, page]);
  

  const handleSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    setGallery([]);
    setTotalPages(null);
    };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  
  return (
<div className={css.appContainer}>

      <Searchbar onSubmit={handleSubmit}></Searchbar>

      {error && <p className={css.message}>Oops, something went wrong, please try again later.</p>}

      {isLoading && (<ThreeDots
      height="80" 
      width="80" 
      color="#303f9f"
      ariaLabel="three-dots-loading"
      visible={true}
      />)}

      {gallery.length !== 0 && <ImageGallery gallery={gallery}></ImageGallery>}
      
      {gallery.length !== 0 && (
        page < totalPages
          ? <Button onClick={handleLoadMore} btnName="Load more"></Button>
          : <p className={css.message}>We're sorry, but you've reached the end of search results.</p>
      )} 

      {gallery.length === 0 && query !== "" && <p className={css.message}>We don't have images "{query}"</p>}
    </div>
  )
}

// export class AppX extends Component {

//   state = {
//     gallery: [],
//     query: "",
//     page: 1,
//     totalPages: null,
//     isLoading: false,
//     error: null,
//   };


//   async componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;

//     if (page !== prevState.page || query !== prevState.query) {
//       try {
//         this.setState({ isLoading: true });
//         const fetch = await fetchPhotos(query, page);

//         this.setState(prevState => {
//           const {hits,totalHits } = fetch;

//           return {
//             gallery: [...prevState.gallery, ...hits],
//             isLoading: false,
//             totalPages: Math.ceil(totalHits / 12),
//           }
//         });

//       } catch (error) {
//         this.setState({ error, isLoading: false,})
//       } 
//     }
//   }


//   handleSubmit = value => {

//     return this.setState({
//       query: value.query,
//       page: 1,
//       gallery: [],
//       totalPages: null,
//     })
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1
//       }
// })
//   }


//   render() {
//     const { isLoading, gallery, page, totalPages, error } = this.state;
//     const galleryImages = gallery.length !== 0;
//     const notLastPage = page < totalPages;

//   return (
//     <div className={css.appContainer}>

//       <Searchbar onSubmit={this.handleSubmit}></Searchbar>

//       {error && <p className={css.message}>Oops, something went wrong, please try again later.</p>}

//       {isLoading && (<ThreeDots
//       height="80" 
//       width="80" 
//       color="#303f9f"
//       ariaLabel="three-dots-loading"
//       visible={true}
//       />)}

//       {galleryImages && <ImageGallery gallery={gallery}></ImageGallery>} 
      
//       {galleryImages && (
//         notLastPage
//           ? <Button onClick={this.handleLoadMore} btnName="Load more"></Button>
//           : <p className={css.message}>We're sorry, but you've reached the end of search results.</p>
//       )} 
//     </div>
//   );
//     };
//   };