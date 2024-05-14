import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { SiweMessage } from "siwe";
import useConnectAndSign from "@/hooks/useConnectAndSign";

const ConnectWalletButton = ({
  className: className = "",
  children,
  disabled,
  onClick: onClick = () => {},
  onSuccess: onSuccess = () => {},
  onError: onError = () => {},
}: {
  name?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  onSuccess?: (message: SiweMessage, signature: string, nonce: string) => void;
  onError?: (message: string) => void;
}) => {
  const {
    isConnecting,
    walletDialog,
    verifyDialog,
    loading,
    handleOpenConnectModal,
    reset,
  } = useConnectAndSign({
    onSuccess,
    onError,
  });

  return (
    <>
      <ConnectButton.Custom>
        {({ openConnectModal, mounted }) => {
          const ready = mounted;
          return (
            <>
              <Button
                variant="ghost"
                className={"min-w-fit " + className}
                onClick={() => {
                  onClick();
                  handleOpenConnectModal(openConnectModal);
                }}
                isDisabled={disabled}
                isLoading={isConnecting || loading || !ready}
                padding={0}
              >
                {children}
              </Button>
            </>
          );
        }}
      </ConnectButton.Custom>
      {walletDialog}
      {verifyDialog}
    </>
  );
};

export default ConnectWalletButton;
