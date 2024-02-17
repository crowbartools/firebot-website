import { Modal } from '../profile/Modal';

export const DevAndExpertsInfoModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onClickAway={onClose}
            widthClass="w-11/12 md:w-2/5 lg:w-2/6"
        >
            <div className="rounded-lg overflow-hidden border-2 border-gray-700 p-5">
                <p>
                    Live streams of Firebot dev team members and recognized
                    Firebot experts. Don't hesitate to ask them questions about
                    Firebot!
                </p>
            </div>
        </Modal>
    );
};
