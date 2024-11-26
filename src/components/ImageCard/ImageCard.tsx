import { Article } from "../../types"
import css from "./ImageCard.module.css"

interface CardProps {
  image: Article;
  onClick: (image : Article) => void;
}

const ImageCard: React.FC<CardProps> = ({ image, onClick }) => {
  return (
    <div >
          <img className={css.card} src={image.urls.small} alt={image.description}
          onClick={()=>onClick(image)}/>
</div>
  )
}

export default ImageCard