const Web3 = require("web3");
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const web3 = new Web3("https://polygon-mumbai.infura.io/v3/" + infuraKey);
const contractABI = require("./contractABI.json");
const contractAddress = "0xF56819d9FAf22Ba131dC3227E606f0173558F52F";

const developerAddress = "0xB8B97b070C78c9dfc6a6BA03DfCA805E676BF725";

export const bingoContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const getDevAddress = async () => {
    let gameID = 1;
    let card = [6, 2, 3, 4, 5, 21, 22, 23, 24, 25, 41, 42, 0, 44, 45, 61, 62, 64, 63, 65, 85, 81, 82, 93, 84];
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: developerAddress, // must match user's active address.
        value: "1",
        data: bingoContract.methods.buyCard(gameID, card).encodeABI(),
    };
    const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
    });
    console.log("transaction id is " + txHash)
    return;
};

export const drawNumber = async (gameId) => {
    const fromAddress = 0x735b7262c99ffe85e3c44d77b1e4adf96e999b16;
    // console.log(window.ethereum);
    if (!window.ethereum) {
        return {
            status: "💡 Connect your Metamask wallet to update the message on the blockchain.",
        };
    }

    // //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: fromAddress, // must match user's active address.
        data: bingoContract.methods.drawNumber(gameId).send(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a
                        target="_blank"
                        href={`https://mumbai.polygonscan.com/tx/${txHash}`}
                    >
                        View the status of your transaction on Etherscan!
                    </a>
                    <br/>
                    ℹ️ Once the transaction is verified by the network, the
                    token balance will be updated automatically.
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
};

const eventDrawNumber = bingoContract.events.NumberDraw();

eventDrawNumber.on("data", (eventData) => {
    console.log("Value changed:", eventData.returnValues.newValue);
});

// export const loadTokenAccountBalance = async (account) => {
//   const balance = await UBCTokenContract.methods.balanceOf(account).call();
//   return balance / 10 ** 18;
// };

// export const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       const addressArray = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       console.log(addressArray);
//       const obj = {
//         status: "👆🏽 input the transfer to addresst in the text-field above.",
//         address: addressArray[0],
//       };
//       return obj;
//     } catch (err) {
//       return {
//         address: "",
//         status: "😥 " + err.message,
//       };
//     }
//   } else {
//     return {
//       address: "",
//       status: (
//         <span>
//           <p>
//             {" "}
//             🦊{" "}
//             <a target="_blank" href={`https://metamask.io/download.html`}>
//               You must install Metamask, a virtual Ethereum wallet, in your
//               browser.
//             </a>
//           </p>
//         </span>
//       ),
//     };
//   }
// };

// export const getCurrentWalletConnected = async () => {
//   if (window.ethereum) {
//     try {
//       const addressArray = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       if (addressArray.length > 0) {
//         return {
//           address: addressArray[0],
//           status: "👆🏽 input the transfer to addresst in the text-field above.",
//         };
//       } else {
//         return {
//           address: "",
//           status: "🦊 Connect to Metamask using the top right button.",
//         };
//       }
//     } catch (err) {
//       return {
//         address: "",
//         status: "😥 " + err.message,
//       };
//     }
//   } else {
//     return {
//       address: "",
//       status: (
//         <span>
//           <p>
//             {" "}
//             🦊{" "}
//             <a target="_blank" href={`https://metamask.io/download.html`}>
//               You must install Metamask, a virtual Ethereum wallet, in your
//               browser.
//             </a>
//           </p>
//         </span>
//       ),
//     };
//   }
// };

// export const transferToken = async (fromAddress, toAddress) => {
//   let value = (10 ** 18).toFixed(0);
//   //input error handling
//   if (!window.ethereum || fromAddress === null) {
//     return {
//       status:
//         "💡 Connect your Metamask wallet to update the message on the blockchain.",
//     };
//   }

//   if (toAddress.trim() === "") {
//     return {
//       status: "❌ Your message cannot be an empty string.",
//     };
//   }

//   // //set up transaction parameters
//   const transactionParameters = {
//     to: contractAddress, // Required except during contract publications.
//     from: fromAddress, // must match user's active address.
//     data: UBCTokenContract.methods.transfer(toAddress, value).encodeABI(),
//   };

//   //sign the transaction
//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     return {
//       status: (
//         <span>
//           ✅{" "}
//           <a
//             target="_blank"
//             href={`https://mumbai.polygonscan.com/tx/${txHash}`}
//           >
//             View the status of your transaction on Etherscan!
//           </a>
//           <br />
//           ℹ️ Once the transaction is verified by the network, the token balance
//           will be updated automatically.
//         </span>
//       ),
//     };
//   } catch (error) {
//     return {
//       status: "😥 " + error.message,
//     };
//   }
// };
