import { Box, Button, Text } from "@chakra-ui/react";
import Dialog from "../Dialog";
import WalletIcon from "../icons/wallet";
import { formatAddress } from "@/utils/string";
import { useCallback } from "react";

export interface ConfirmWalletDialogProps {
  address?: string;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryClick: () => void;
}

const ConfirmWalletDialog = ({
  address,
  isOpen,
  onClose,
  onPrimaryClick,
}: ConfirmWalletDialogProps) => {
  const handlePrimaryClick = useCallback(() => {
    onPrimaryClick();
    onClose();
  }, [onPrimaryClick, onClose]);

  return (
    <Dialog
      title={
        <Box display="flex" alignItems="center" gap={2}>
          <WalletIcon />
          <span>CONFIRM WALLET</span>
        </Box>
      }
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button flex="1" width="full" colorScheme="gray" onClick={onClose}>
            CHANGE ACCOUNT
          </Button>
          <Button
            flex="1"
            width="full"
            colorScheme="blue"
            onClick={handlePrimaryClick}
          >
            CONFIRM
          </Button>
        </>
      }
    >
      <Text>YOU ARE CONNECTING THE FOLLOWING ADDRESS:</Text>
      <Box
        display="flex"
        justifyContent="center"
        bgColor="lightgray"
        py={1}
        mt={2}
        rounded="full"
      >
        <Text as="b">{formatAddress(address || "")}</Text>
      </Box>
    </Dialog>
  );
};

export default ConfirmWalletDialog;
