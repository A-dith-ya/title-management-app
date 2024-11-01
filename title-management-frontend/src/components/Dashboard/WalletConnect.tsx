import { useState } from "react";
import { BrowserProvider } from "ethers";
import { toast } from "react-toastify";
import styles from "./WalletConnect.module.css";

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      onConnect(address);
      toast.success("Connected to MetaMask!");
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      toast.error("Failed to connect to MetaMask.");
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={connectToMetaMask}
        className={styles.button}
        disabled={!!walletAddress}
      >
        {walletAddress ? "Connected" : "Connect to MetaMask"}
      </button>
      <p className={styles.walletAddress}>
        Wallet Address: {walletAddress || "Not Connected"}
      </p>
    </div>
  );
};

export default WalletConnect;
