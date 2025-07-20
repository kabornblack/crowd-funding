
// import { useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const checkIfWalletIsConnected = async() => {
//     try {
//       const {solana} = window;
//       if (solana) {
//         if (solana.isPhantom) {
//           console.log("Phantom wallet found!")
//           const response = await solana.connect({
//             onlyIfTrusted: true,
//           });
//           console.log("Connected with public key:", response.publicKey.toString());
//         } else {
//           alert("Solana object not found! Get a Phantom wallet")
//         }
//       } 
//       else {
//       alert("No Solana wallet found! Please install Phantom.");
//     }
//     } catch(error) {
//       console.log(error)
//     }
//   }

//   const connectWallet = async () => {};

//   const renderNotConnectedContainer = () => {
//     <button onClick={connectWallet}>Connect wallet</button>
//   }

//   useEffect(() => {
//     const onLoad = async() => {
//       await checkIfWalletIsConnected()
//     }
//     window.addEventListener("load", onLoad)
//     return () => window.removeEventListener("load", onLoad);
//   }, []);

//   return <div className="App">{renderNotConnectedContainer()}</div>
// };

// export default App;
////////////////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        // console.log("Phantom wallet found!");
        const response = await solana.connect({ onlyIfTrusted: true });
        // console.log("Connected with public key:", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Phantom wallet not found! Please install it.");
      }
    } catch (error) {
      console.log("Error checking wallet:", error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      try {
        const response = await solana.connect();
        console.log("Wallet connected:", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    }
  };

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>Connect Wallet</button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      {walletAddress ? (
        <p>Connected wallet: {walletAddress}</p>
      ) : (
        renderNotConnectedContainer()
      )}
    </div>
  );
};

export default App;
