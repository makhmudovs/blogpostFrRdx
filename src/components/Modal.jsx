import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
        {children}
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
