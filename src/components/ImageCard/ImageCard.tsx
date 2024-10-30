import s from "./ImageCard.module.css";

type Props  = {
  likes: number,
  smallImg: string,
  largeImg: string,
  alt: string,
  openModalFu: (imgURL: string) => void,
}

const ImageCard = ({ likes, smallImg, largeImg, alt, openModalFu }: Props) => {
  return (
    <div className={s.cardDiv}>
      <img
        src={smallImg}
        alt={alt}
        className={s.cardImg}
        onClick={() => openModalFu(largeImg)}
      />
      <span className={s.cardDesc}>
        <p className={s.cardDescItem}>Likes: {likes}</p>
        <p className={s.cardDescItem}>{alt}</p>
      </span>
    </div>
  );
};

export default ImageCard;
