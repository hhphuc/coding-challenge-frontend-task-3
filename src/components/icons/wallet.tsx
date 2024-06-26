import { Icon } from "@chakra-ui/icons";

export interface WalletIconProps {
  width?: number;
  height?: number;
}

const WalletIcon = ({ width = 6, height = 6 }: WalletIconProps) => (
  <Icon viewBox="0 0 24 24" width={width} height={height}>
    <path
      fill="currentColor"
      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    />
  </Icon>
);

export default WalletIcon;
