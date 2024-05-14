import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SiweMessage } from "siwe";
import ConnectWalletButton from "../components/ConnectWalletButton";
import apiUtils from "@/utils/apiUtils";
import useToast, { ToastStatus } from "@/hooks/useToast";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const { toast } = useToast();

  const onClick = useCallback(() => {}, []);

  const onSuccess = useCallback(
    (message: SiweMessage, signature: string, nonce: string) => {
      // verify signature with message from backend
      const verifyMessage = async () => {
        const body = { message, signature, nonce };
        const verifyResult = await apiUtils.post("/api/verify-signature", body);
        if (verifyResult.success) {
          toast(
            ToastStatus.SUCCESS,
            "Signed Success",
            `Signed success by the wallet ${verifyResult.data.address}`,
          );
          setWallet(verifyResult.data.address);
        }
      };

      verifyMessage();
    },
    [],
  );

  const onError = useCallback((message: string) => {
    setWallet("");

    toast(ToastStatus.ERROR, "Error", message);
  }, []);

  return (
    <div className="container m-auto p-8 flex flex-col gap-8">
      <h1>Wallet: {wallet || "Not Connected"}</h1>

      <div className="flex flex-col gap-4  items-start">
        <ConnectWalletButton
          onClick={onClick}
          onSuccess={onSuccess}
          onError={onError}
        >
          <Button
            as="div"
            gap={2}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
              "& > svg": {
                animation: "arrowMovement 0.25s infinite alternate",
              },
            }}
            color="white"
          >
            Connect Wallet
            <ArrowForwardIcon />
          </Button>
        </ConnectWalletButton>
      </div>
    </div>
  );
}
