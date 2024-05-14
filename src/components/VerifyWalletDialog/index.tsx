import { Box, Button, Text } from "@chakra-ui/react";
import Dialog from "../Dialog";
import WalletIcon from "../icons/wallet";
import { formatAddress } from "@/utils/string";
import { useCallback } from "react";

export interface VerifyWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyWalletDialog = ({ isOpen, onClose }: VerifyWalletDialogProps) => {
  return (
    <Dialog
      title={
        <Box display="flex" alignItems="center" gap={2}>
          <WalletIcon />
          <span>VERIFY WALLET</span>
        </Box>
      }
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Button colorScheme="gray" onClick={onClose}>
          CANCEL
        </Button>
      }
    >
      <Text>
        PLEASE CONTINUE IN YOUR WALLET APPLICATION TO VERIFY YOUR WALLET
        OWNERSHIP BY SIGNING THE MESSAGE.
      </Text>
    </Dialog>
  );
};

export default VerifyWalletDialog;
