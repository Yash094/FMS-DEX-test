import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ACTIVE_CHAIN, DEX_ADDRESS, TOKEN_ADDRESS } from "@/const/details";
import {
  ConnectWallet,
  toEther,
  toWei,
  useAddress,
  useBalance,
  useContract,
  useContractMetadata,
  useContractRead,
  useContractWrite,
  useNetworkMismatch,
  useSDK,
  useSwitchChain,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import SwapInput from "@/components/SwapInput";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const toast = useToast();
  const address = useAddress();
  const { contract: tokenContract } = useContract(TOKEN_ADDRESS, "token");
  const { contract: dexContract } = useContract(DEX_ADDRESS, "custom");
  const { data: symbol } = useContractRead(tokenContract, "symbol");
  const { data: tokenMetadata } = useContractMetadata(tokenContract);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { data: nativeBalance } = useBalance();
  const { data: contractTokenBalance } = useTokenBalance(
    tokenContract,
    DEX_ADDRESS
  );
  const { contract, isLoading, error } = useContract(
    "0x5d1D35473Ab0EC0894711203DAed776EaA4972d1",
    [
      {
        "type": "constructor",
        "name": "",
        "inputs": [
          {
            "type": "address",
            "name": "_token",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "_defaultAdmin",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "_name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "_symbol",
            "internalType": "string"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "event",
        "name": "Approval",
        "inputs": [
          {
            "type": "address",
            "name": "owner",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "spender",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "value",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "ContractURIUpdated",
        "inputs": [
          {
            "type": "string",
            "name": "prevURI",
            "indexed": false,
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "newURI",
            "indexed": false,
            "internalType": "string"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "OwnerUpdated",
        "inputs": [
          {
            "type": "address",
            "name": "prevOwner",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "newOwner",
            "indexed": true,
            "internalType": "address"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "TokensMinted",
        "inputs": [
          {
            "type": "address",
            "name": "mintedTo",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "quantityMinted",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "Transfer",
        "inputs": [
          {
            "type": "address",
            "name": "from",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "to",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "value",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "inputs": [],
        "outputs": [
          {
            "type": "bytes32",
            "name": "",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "addLiquidity",
        "inputs": [
          {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "allowance",
        "inputs": [
          {
            "type": "address",
            "name": "owner",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "type": "address",
            "name": "account",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "burn",
        "inputs": [
          {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "burnFrom",
        "inputs": [
          {
            "type": "address",
            "name": "_account",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "contractURI",
        "inputs": [],
        "outputs": [
          {
            "type": "string",
            "name": "",
            "internalType": "string"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [
          {
            "type": "uint8",
            "name": "",
            "internalType": "uint8"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "decreaseAllowance",
        "inputs": [
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "subtractedValue",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "getAmountOfTokens",
        "inputs": [
          {
            "type": "uint256",
            "name": "inputAmount",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "inputReserve",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "outputReserve",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "pure"
      },
      {
        "type": "function",
        "name": "getTokensInContract",
        "inputs": [],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "increaseAllowance",
        "inputs": [
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "addedValue",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "mintTo",
        "inputs": [
          {
            "type": "address",
            "name": "_to",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "multicall",
        "inputs": [
          {
            "type": "bytes[]",
            "name": "data",
            "internalType": "bytes[]"
          }
        ],
        "outputs": [
          {
            "type": "bytes[]",
            "name": "results",
            "internalType": "bytes[]"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "string",
            "name": "",
            "internalType": "string"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "nonces",
        "inputs": [
          {
            "type": "address",
            "name": "owner",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "permit",
        "inputs": [
          {
            "type": "address",
            "name": "owner",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "spender",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "value",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "deadline",
            "internalType": "uint256"
          },
          {
            "type": "uint8",
            "name": "v",
            "internalType": "uint8"
          },
          {
            "type": "bytes32",
            "name": "r",
            "internalType": "bytes32"
          },
          {
            "type": "bytes32",
            "name": "s",
            "internalType": "bytes32"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "removeLiquidity",
        "inputs": [
          {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setContractURI",
        "inputs": [
          {
            "type": "string",
            "name": "_uri",
            "internalType": "string"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setOwner",
        "inputs": [
          {
            "type": "address",
            "name": "_newOwner",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "swapEthToToken",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "swapTokenToEth",
        "inputs": [
          {
            "type": "uint256",
            "name": "_tokensSold",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "string",
            "name": "",
            "internalType": "string"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "token",
        "inputs": [],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "transfer",
        "inputs": [
          {
            "type": "address",
            "name": "to",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "type": "address",
            "name": "from",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "to",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "nonpayable"
      }
    ],
  );

  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const sdk = useSDK();
  const [contractBalance, setContractBalance] = useState<string>("0");

  const [nativeValue, setNativeValue] = useState<string>("0");
  const [tokenValue, setTokenValue] = useState<string>("0");
  const [currentFrom, setCurrentFrom] = useState<string>("native");
  const [loading, setLoading] = useState<boolean>(false);

  const { mutateAsync: swapNativeToToken } = useContractWrite(
    dexContract,
    "swapEthTotoken"
  );
  const { mutateAsync: swapTokenToNative } = useContractWrite(
    dexContract,
    "swapTokenToEth"
  );
  const { mutateAsync: approveTokenSpending } = useContractWrite(
    tokenContract,
    "approve"
  );

  const { data: amountToGet } = useContractRead(
    dexContract,
    "getAmountOfTokens",
    currentFrom === "native"
      ? [
          toWei(nativeValue || "0"),
          toWei(contractBalance || "0"),
          contractTokenBalance?.value,
        ]
      : [
          toWei(tokenValue || "0"),
          contractTokenBalance?.value,
          toWei(contractBalance || "0"),
        ]
  );
 
  

  const fetchContractBalance = async () => {
    try {
      const balance = await sdk?.getBalance(DEX_ADDRESS);
      setContractBalance(balance?.displayValue || "0");
    } catch (err) {
      console.error(err);
    }
  };

  const executeSwap = async () => {
    setLoading(true);
    if (isMismatched) {
      switchChain(ACTIVE_CHAIN.chainId);
      setLoading(false);
      return;
    }
    try {
      if (currentFrom === "native") {
        await swapNativeToToken({ overrides: { value: toWei(nativeValue) } });
        toast({
          status: "success",
          title: "Swap Successful",
          description: `You have successfully swapped your ${
            ACTIVE_CHAIN.nativeCurrency.symbol
          } to ${symbol || "tokens"}.`,
        });
      } else {
        // Approve token spending
        await approveTokenSpending({ args: [DEX_ADDRESS, toWei(tokenValue)] });
        // Swap!
        await swapTokenToNative({ args: [toWei(tokenValue)] });
        toast({
          status: "success",
          title: "Swap Successful",
          description: `You have successfully swapped your ${
            symbol || "tokens"
          } to ${ACTIVE_CHAIN.nativeCurrency.symbol}.`,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "Swap Failed",
        description:
          "There was an error performing the swap. Please try again.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractBalance();
    setInterval(fetchContractBalance, 10000);
  }, []);

  useEffect(() => {
    if (!amountToGet) return;
    if (currentFrom === "native") {
      setTokenValue(toEther(amountToGet));
    } else {
      setNativeValue(toEther(amountToGet));
    }
  }, [amountToGet]);

  return (
    <>
      <Head>
        <title>FMS DEX</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Flex
        direction="column"
        gap="5"
        mt="40"
        p="5"
        mx="auto"
        maxW={{ base: "sm", md: "xl" }}
        w="full"
        rounded="2xl"
        borderWidth="1px"
        borderColor="gray.300"
      >
        <Flex
          direction={currentFrom === "native" ? "column" : "column-reverse"}
          gap="3"
        >
          <SwapInput
            current={currentFrom}
            type="native"
            max={nativeBalance?.displayValue}
            value={nativeValue}
            setValue={setNativeValue}
            tokenImage={"https://i.imgur.com/z0Mnily.png"}
          />

          <Button
            onClick={() =>
              currentFrom === "native"
                ? setCurrentFrom("token")
                : setCurrentFrom("native")
            }
            maxW="5"
            mx="auto"
          >
            ↓
          </Button>

          <SwapInput
            current={currentFrom}
            type="token"
            max={tokenBalance?.displayValue}
            value={tokenValue}
            setValue={setTokenValue}
            tokenImage={tokenMetadata?.image}
          />
        </Flex>

        {address ? (
          <Button
            onClick={executeSwap}
            py="7"
            fontSize="2xl"
            colorScheme="twitter"
            rounded="xl"
            isDisabled={loading}
          >
            {loading ? <Spinner /> : "Swap"}
          </Button>
        ) : (
          <ConnectWallet 
          theme={"light"}
          btnTitle={"Connect Wallet"}
          modalTitle={""}
          modalSize={"wide"}
          welcomeScreen={{
            title: "FMS DEX",
            subtitle: "Swap FMS Token with MATIC",
            img: {
              src: "https://i.imgur.com/3D2Arx0.png",
              width: 150,
              height: 150,
            },
          }}
          modalTitleIconUrl={
            "https://i.imgur.com/34MRBfl.png"
          }
        />
        )}
      </Flex>
    </>
  );
}