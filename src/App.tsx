import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";
import searchImagesForTopic from "./search-img-api.ts";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Modal from "react-modal";

import { Image } from "./search-img-api.ts";
const App = () => {
  const [serverData, setServerData] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  Modal.setAppElement("#root");

  const openModal = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  const submitFu = async (newTopic: string): Promise<void> => {
    try {
      setPage(1);
      setError(false);
      setLoader(true);
      setTopic(newTopic);

      const data = await searchImagesForTopic(newTopic, 1);
      setServerData(data);
    } catch {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreFu = async (): Promise<void> => {
    try {
      setLoader(true);
      const nextPage: number = page + 1;

      const data = await searchImagesForTopic(topic, nextPage);
      setPage(nextPage);
      setServerData((prev) => [...prev, ...data]);
    } catch {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={submitFu} />
      <Toaster />
      {serverData.length > 0 && (
        <ImageGallery galleryList={serverData} openModalFu={openModal} />
      )}
      {serverData.length > 0 && !loader && (
        <LoadMoreButton loadMoreFu={loadMoreFu} />
      )}
      {error && <ErrorMessage />}
      {loader && <Loader />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentImage={currentImage}
        />
      )}
    </>
  );
};

export default App;
