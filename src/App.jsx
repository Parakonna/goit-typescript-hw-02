
import { useEffect, useState } from "react";
import { fetchPhotos } from "../src/services/api"
import { InfinitySpin } from "react-loader-spinner";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { toast, Toaster } from 'react-hot-toast';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  
  
  useEffect(() => {
    if (!query) return;
    async function fetchPhotosBySearchValue() {
      try {
        setLoading(true);
        const data = await fetchPhotos(query,page);
        console.log(data); 
        if (page !== 1) {
          setArticles(prevState => [...prevState, ...data]);
        } else {
          setArticles(data); 
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotosBySearchValue();
  }, [query, page])
  
  const openModal = article => {
    console.log('Image object:', article);
    setModalImg({
      url: article.urls.regular,
      description: article.description,
      likes: article.likes,
      author: article.user.name,
    });
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImg(null);
    document.body.style.overflow = 'auto';
  };

  const handleClick = () => {
      setPage(prevPage => prevPage + 1);
  };
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const searchTerm = form.elements.input.value.trim('');
    if (searchTerm === '') {
      toast.error('Enter a search word!');
      return;
    }
    setQuery(searchTerm);
    setPage(1);
    setArticles([]);
    form.reset();
  };
    

  return (
    <>
      <div><SearchBar onSubmit={handleSubmit} />
        <Toaster position="top-right" />
      </div>
      
      {loading && (
        <div><InfinitySpin /></div>)}
      {error && (<p>Error:&quot;{error}&quot</p>)}
     <ImageGallery articles={articles} onClick={openModal} />
      {error && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedImg={modalImg}
        />
      )}
      {!loading && articles.length > 0 && <LoadMoreBtn onClick={handleClick} />}
    </>
  );
}

export default App
