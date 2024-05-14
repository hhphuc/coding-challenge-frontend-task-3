import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

export interface DialogProps extends ModalProps {
  title: JSX.Element;
  footer: JSX.Element;
}

const Dialog = (props: DialogProps) => {
  const { children, title, footer, ...restProps } = props;

  return (
    <Modal {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <hr />
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap={2}>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default Dialog;
