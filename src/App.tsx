
import { useEffect, useState, FormEvent } from "react";
import { fetchPhotos } from "./services/api"

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";

import { toast, Toaster } from 'react-hot-toast';

import { Article, ModalImg } from "./types";

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<ModalImg | null>(null);

  
  
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
        if (error instanceof Error) {
    setError(error.message);
  } else {
    setError(String(error));
  }
      } finally {
        setLoading(false);
      }
    }
    fetchPhotosBySearchValue();
  }, [query, page])
  
  const openModal = (article: Article) => {
    console.log('Image object:', article);
    setModalImg({
      urls: {
      regular: article.urls.regular,
      small: article.urls.small,
    },
      description: article.description,
      likes: article.likes,
      author: article.user.name,
    });
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalImg(null);
    document.body.style.overflow = 'auto';
  };

  const handleClick = (): void => {
      setPage(prevPage => prevPage + 1);
  };
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const searchTerm = (form.elements.namedItem("input") as HTMLInputElement).value.trim();
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
        <div><Loader isLoading={loading}/></div>)}
      {error && (<p>Error:&quot;{error}&quot</p>)}
     <ImageGallery articles={articles} onClick={openModal} />
      {error && <ErrorMessage message={
            "Whoops, something went wrong! Please try reloading this page!"
          }/>}
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
