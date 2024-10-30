import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

type GalleryItem = {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
};

type Props = {
  galleryList: GalleryItem[];
  openModalFu: (imgURL: string) => void;
};

const ImageGallery = ({ galleryList, openModalFu }: Props) => {
  return (
    <ul className={s.galleryList}>
      {galleryList.map(
        ({ id, likes, alt_description, urls: { regular, small } }) => (
          <li key={id} className={s.galleryCard}>
            <ImageCard
              likes={likes}
              smallImg={small}
              largeImg={regular}
              alt={alt_description}
              openModalFu={openModalFu}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default ImageGallery;
