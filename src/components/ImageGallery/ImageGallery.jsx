import ImageCard from "../ImageCard/ImageCard"
import css from './ImageGallery.module.css'

const ImageGallery = ({articles, onClick}) => {
  return (
     <ul className={css.list}>{articles !== null && articles.map((artikle) => {
       return (<li key={artikle.id}>
           <ImageCard image={artikle} onClick={() => onClick(artikle)} />
	</li>)
    })}		
</ul>
)
}

export default ImageGallery