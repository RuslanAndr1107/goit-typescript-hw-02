import s from "./LoadMoreButton.module.css";

type Props = {
  loadMoreFu: () => void,
}

const LoadMoreButton = ({ loadMoreFu }: Props) => {
  return (
    <div className={s.loadMoreDiv}>
      <button className={s.loadMoreButton} onClick={() => loadMoreFu()}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
