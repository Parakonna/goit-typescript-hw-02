import css from './LoadMoreBtn.module.css'

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps>  = ({onClick}) => {
  return (
    <button type="button" className={css.loadBtn} onClick={onClick}>
      Load more
    </button>
  )
}

export default LoadMoreBtn