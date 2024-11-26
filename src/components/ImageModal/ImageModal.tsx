import css from './ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { CgCloseO } from 'react-icons/cg';
import { ModalImg } from '../../types';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  selectedImg: ModalImg | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalIsOpen, closeModal, selectedImg }) => {
  return (
    <Modal
      className={css.customModalContent}
      overlayClassName={css.overlay}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Expended image"
    >
      <button
        className={css.btnClose}
        onClick={closeModal}
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <CgCloseO size={30} />
      </button>

      {selectedImg && (
        <div>
          <img
            className={css.modalImg}
            src={selectedImg.urls.regular}
            alt={selectedImg.description || 'Image'}
          />
          {selectedImg.description && <p>{selectedImg.description}</p>}
          <p>Author: {selectedImg.author}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;