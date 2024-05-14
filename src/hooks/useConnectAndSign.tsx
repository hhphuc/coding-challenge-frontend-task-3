import { useCallback, useEffect, useState } from "react";
import { SiweMessage, generateNonce } from "siwe";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import ConfirmWalletDialog from "@/components/ConfirmWalletDialog";
import VerifyWalletDialog from "@/components/VerifyWalletDialog";
import { signingMessage } from "@/services/auth";

interface IConnectAndSignProps {
  onSuccess: (message: SiweMessage, signature: string, nonce: string) => void;
  onError: (message: string) => void;
}

const useConnectAndSign = ({ onSuccess, onError }: IConnectAndSignProps) => {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const [walletDialog, setWalletDialog] = useState<JSX.Element | null>(null);
  const [verifyDialog, setVerifyDialog] = useState<JSX.Element | null>(null);
  const [message, setMessage] = useState<SiweMessage | null>(null);
  const [nonce, setNonce] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: signature,
    isSuccess: isSigned,
    error: signError,
    signMessage,
    status: signStatus,
  } = useSignMessage();

  useEffect(() => {
    disconnect();
  }, []);

  // show wallet dialog when connected
  useEffect(() => {
    if (address && isConnected) {
      setLoading(false);
      setWalletDialog(
        <ConfirmWalletDialog
          isOpen={true}
          onClose={resetConnectWallet}
          address={address}
          onPrimaryClick={handleSignMessage}
        />,
      );
    }
  }, [address, isConnected]);

  // show verify dialog when signStatus is pending
  useEffect(() => {
    if (signStatus !== "pending") {
      setVerifyDialog(null);
      return;
    }

    setWalletDialog(null);
    setVerifyDialog(<VerifyWalletDialog isOpen={true} onClose={reset} />);
  }, [signStatus]);

  // sign success
  useEffect(() => {
    if (isSigned && message) {
      setLoading(false);
      onSuccess(message, signature, nonce);
    }
  }, [message, signature, nonce, isSigned]);

  // handle sign error
  useEffect(() => {
    if (signError) {
      setLoading(false);
      onError(signError.message);
    }
  }, [signError, onError]);

  const handleOpenConnectModal = useCallback((openConnectModal: () => void) => {
    if (isConnected) {
      return;
    }

    openConnectModal();
  }, []);

  const handleSignMessage = useCallback(() => {
    const triggerSignMessage = async (): Promise<SiweMessage | null> => {
      setLoading(true);
      if (address) {
        const nonce = generateNonce();
        setNonce(nonce);

        const message = signingMessage(address, nonce);
        setMessage(message);

        const signableMessage = message.prepareMessage();
        signMessage({ account: address, message: signableMessage });
      }

      return null;
    };

    triggerSignMessage();
  }, [address]);

  const resetSignMessage = useCallback(() => {
    setLoading(false);
    setVerifyDialog(null);
    setMessage(null);
    setNonce("");
  }, []);

  const resetConnectWallet = useCallback(() => {
    setLoading(false);
    setWalletDialog(null);
    disconnect();
  }, []);

  const reset = useCallback(() => {
    resetConnectWallet();
    resetSignMessage();
  }, [resetConnectWallet, resetSignMessage]);

  return {
    isConnecting,
    isConnected,
    walletDialog,
    verifyDialog,
    loading,
    handleOpenConnectModal,
    reset,
  };
};

export default useConnectAndSign;
