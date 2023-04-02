const Web3 = require("web3");
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const web3 = new Web3("https://polygon-mumbai.infura.io/v3/" + infuraKey);
const contractABI = require("./contractABI.json");
const contractAddress = "0xF56819d9FAf22Ba131dC3227E606f0173558F52F";

export const bingoContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const loadGames = async () => {
    console.log(infuraKey);
    console.log("aaa");
    // const games = await bingoContract.methods
    //   .drawNumber(1)
    //   .send({ from: "0xb8b97b070c78c9dfc6a6ba03dfca805e676bf725" });
    const dev_addr = await bingoContract.methods
        .num_games()
        .call()
        .then((result) => console.log("res", result))
        .catch((error) => console.error(error));
};

const event = bingoContract.events.NumberDraw();

event.on("data", (eventData) => {
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
