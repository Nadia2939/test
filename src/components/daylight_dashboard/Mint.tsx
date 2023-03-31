import {BigNumber, ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi';
import {CONTRACTS} from '../../typescript/contracts';

const updateConversion = (amount: number) => {
  const moneyRegex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
  const amountAsString = String(amount);
  const match = moneyRegex.test(amountAsString);

  return match ? amount * 5 : null;
};

const calculatePayout = (amount: number, price: number, fee: number, div = false) => {
  if (amount === 0 || price === 0) return 0;

  if (div) return (amount / price) * fee;
  return amount * price * fee;
};

type activeButtonT = 'mint' | 'redeem';

export default function Mint(props: {
  price: string;
  userTokenBalance: string;
  userBusdBalance: string;
  busdAllowance: BigNumber;
}) {
  const {price, userTokenBalance, userBusdBalance, busdAllowance} = props;
  // console.log('props', price, userTokenBalance, userBusdBalance, busdAllowance.toString());
  const [activeButton, setActiveButton] = useState<activeButtonT>('mint');

  const [inputAmount, setInputAmount] = useState<number>();

  const feeDenom = 10 ** 5;
  const [mintFee, setMintFee] = useState(0);
  const [sellFee, setSellFee] = useState(0);

  // const [userTokenBalance, setUserTokenBalance] = useState<string>('0.00');
  // const [userBusdBalance, setUserBusdBalance] = useState<string>('0.00');

  // const [tokenAllowance, setTokenAllowance] = useState<BigNumber>();
  // const [busdAllowance, setBusdAllowance] = useState<BigNumber>();

  const apolloConfig = CONTRACTS.find(c => c.name === 'apollo');
  const busdConfig = CONTRACTS.find(c => c.name === 'busd');

  const {address, isConnected} = useAccount();

  const getMintFee = useContractRead({
    address: apolloConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'mintFee',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
      },
    ],
    functionName: 'mintFee',
    watch: false,
    // enabled: false,
    onError: error => console.log(error),
    onSuccess: data => {
      setMintFee(data.toNumber() / feeDenom);
    },
  });

  const getSellFee = useContractRead({
    address: apolloConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'sellFee',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
      },
    ],
    functionName: 'sellFee',
    watch: false,
    // enabled: false,
    onError: error => console.log(error),
    onSuccess: data => {
      setSellFee(data.toNumber() / feeDenom);
    },
  });

  // const getTokenAllowance = useContractRead({
  //   address: apolloConfig?.address || ethers.constants.AddressZero,
  //   abi: [
  //     {
  //       name: 'allowance',
  //       type: 'function',
  //       stateMutability: 'view',

  //       inputs: [
  //         {internalType: 'address', name: 'holder', type: 'address'},
  //         {internalType: 'address', name: 'spender', type: 'address'},
  //       ],
  //       outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
  //     },
  //   ],
  //   functionName: 'allowance',
  //   args: [address || ethers.constants.AddressZero, apolloConfig?.address || ethers.constants.AddressZero],
  //   watch: true,
  //   onError: error => console.log(error),
  //   onSuccess: data => {
  //     setTokenAllowance(data);
  //   },
  // });

  // const getBusdAllowance = useContractRead({
  //   address: busdConfig?.address || ethers.constants.AddressZero,
  //   abi: [
  //     {
  //       name: 'allowance',
  //       type: 'function',
  //       stateMutability: 'view',
  //       inputs: [
  //         {internalType: 'address', name: 'owner', type: 'address'},
  //         {internalType: 'address', name: 'spender', type: 'address'},
  //       ],
  //       outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
  //     },
  //   ],
  //   functionName: 'allowance',
  //   args: [address || ethers.constants.AddressZero, apolloConfig?.address || ethers.constants.AddressZero],
  //   watch: true,
  //   onError: error => console.log(error),
  //   onSuccess: data => {
  //     setBusdAllowance(data);
  //   },
  // });

  // const getUserTokenBalance = useBalance({
  //   address: address,
  //   token: apolloConfig?.address || ethers.constants.AddressZero,
  //   watch: true,
  //   onError: error => console.log(error),
  //   onSuccess(data) {
  //     setUserTokenBalance(data.formatted);
  //   },
  // });

  // const getUserBUSDBalance = useBalance({
  //   address: address,
  //   token: busdConfig?.address || ethers.constants.AddressZero,
  //   watch: true,
  //   onError: error => console.log(error),
  //   onSuccess(data) {
  //     setUserBusdBalance(data.formatted);
  //   },
  // });

  const {config: mintApprovalConfig} = usePrepareContractWrite({
    address: busdConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'approve',
        type: 'function',
        stateMutability: 'nonpayable',
        constant: false,
        inputs: [
          {type: 'address', name: 'spender', internalType: 'address'},
          {type: 'uint256', name: 'amount', internalType: 'uint256'},
        ],
        outputs: [{type: 'bool', name: '', internalType: 'bool'}],
      },
    ],
    functionName: 'approve',
    args: [apolloConfig?.address || ethers.constants.AddressZero, ethers.constants.MaxUint256],
    // onError: error => console.log(error),
    // onSuccess: data => toast('Succesfully approved 1', {type: 'success'}),
  });

  // const {config: redeemApprovalConfig} = usePrepareContractWrite({
  //   address: apolloConfig?.address || ethers.constants.AddressZero,
  //   abi: [
  //     {
  //       name: 'approve',
  //       type: 'function',
  //       stateMutability: 'nonpayable',
  //       inputs: [
  //         {type: 'address', name: 'spender', internalType: 'address'},
  //         {type: 'uint256', name: 'amount', internalType: 'uint256'},
  //       ],
  //       outputs: [{type: 'bool', name: '', internalType: 'bool'}],
  //     },
  //   ],
  //   functionName: 'approve',
  //   args: [busdConfig?.address || ethers.constants.AddressZero, ethers.constants.MaxUint256],
  //   // onError: error => console.log(error),
  //   // onSuccess: data => toast('Succesfully approved 2', {type: 'success'}),
  // });

  const {config: mintWriteconfig} = usePrepareContractWrite({
    address: apolloConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'mintWithBacking',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          {type: 'uint256', name: 'numTokens', internalType: 'uint256'},
          {type: 'address', name: 'recipient', internalType: 'address'},
        ],
        outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
      },
    ],
    functionName: 'mintWithBacking',
    args: [ethers.utils.parseEther(inputAmount?.toString() || '0'), address || ethers.constants.AddressZero],
    // onError: error => console.log(error),
    // onSuccess: data => toast('Succesfully minted', {type: 'success'}),
  });

  const {config: redeemWriteconfig} = usePrepareContractWrite({
    address: apolloConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        inputs: [
          {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
          {internalType: 'address', name: 'recipient', type: 'address'},
        ],
        name: 'sell',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      // {
      //   name: 'redeem',
      //   type: 'function',
      //   stateMutability: 'nonpayable',
      //   inputs: [
      //     {type: 'uint256', name: 'numTokens', internalType: 'uint256'},
      //     {type: 'address', name: 'recipient', internalType: 'address'},
      //   ],
      //   outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
      // },
    ],
    functionName: 'sell',
    args: [ethers.utils.parseEther(inputAmount?.toString() || '0'), address || ethers.constants.AddressZero],
    // onSettled: (data, error) => {
    //   console.log('settled', data, error);
    // },
    // onError: error => console.log(error),
    // onSuccess: data => toast('Succesfully redeemed', {type: 'success'}),
  });

  const {
    data: mintWriteData,
    isLoading: mintWriteIsLoading,
    isSuccess: mintWriteIsSuccess,
    write: mintWrite,
  } = useContractWrite({
    ...mintWriteconfig,
    onError: error => console.log(error),
    onSuccess: data => {
      toast('Succesfully minted', {type: 'success'});
    },
  });
  const {
    data: redeemWriteData,
    isLoading: redeemWriteIsLoading,
    isSuccess: redeemWriteIsSuccess,
    write: redeemWrite,
  } = useContractWrite({
    ...redeemWriteconfig,
    onError: error => console.log(error),
    onSuccess: data => {
      toast('Succesfully redeemed', {type: 'success'});
    },
  });
  // ,{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"sell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}
  const {
    data: mintApprovalData,
    isLoading: mintApprovalIsLoading,
    isSuccess: mintApprovalIsSuccess,
    write: mintApproval,
  } = useContractWrite({
    ...mintApprovalConfig,
    onError: error => console.log(error),
    onSuccess: data => {
      toast('Succesfully approved', {type: 'success'});
    },
  });
  // const {
  //   data: redeemApprovalData,
  //   isLoading: redeemApprovalIsLoading,
  //   isSuccess: redeemApprovalIsSuccess,
  //   write: redeemApproval,
  // } = useContractWrite({
  //   ...redeemApprovalConfig,
  //   onError: error => console.log(error),
  //   onSuccess: data => {
  //     toast('Succesfully approved', {type: 'success'});
  //   },
  // });

  useEffect(() => {
    getMintFee;
    getSellFee;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className="text-left font-eudoxussans font-medium text-white/70 p-4 bg-black/60 border border-green-primary rounded-lg w-full min-w-[16rem] max-w-[25rem] content-center h-full" /* col-start-3 col-end-4  */
      >
        <div className="flex flex-row justify-evenly uppercase mt-2 py-2">
          <button
            className={`p-2 pb-4 uppercase ${activeButton === 'mint' ? 'border-b-2 border-green-primary' : ''}`}
            onClick={() => setActiveButton('mint')}
          >
            Buy
          </button>
          <button
            className={`p-2 pb-4 uppercase ${activeButton === 'redeem' ? 'border-b-2 border-green-primary' : ''}`}
            onClick={() => setActiveButton('redeem')}
          >
            Sell
          </button>
        </div>

        <div className="flex flex-row justify-around py-2">
          <p className="text-left ">$USDT Balance</p>
          <p className="text-right ">$ARTMS Balance</p>
        </div>
        <div className="flex flex-row justify-between py-2 px-3">
          <p className="text-left">{ethers.utils.commify(Number(userBusdBalance).toFixed(3))}</p>
          <p className="text-right">
            {ethers.utils.commify(Number(userTokenBalance).toFixed(3))} ( $
            {Number(userTokenBalance) > 0 || Number(props.price) > 0
              ? ethers.utils.commify((Number(userTokenBalance) * Number(props.price)).toFixed(3))
              : 0.0}
            &nbsp;)
          </p>
        </div>

        <div className="relative">
          <form action="#" className="p-2">
            <input
              className=" border-none rounded-lg w-full text-[#c0c4ce] bg-gray-100/20 h-12"
              type="number"
              placeholder="Amount"
              name="amount"
              id="amount"
              value={inputAmount}
              onChange={e => {
                setInputAmount(Number(e.target.value) || undefined);
              }}
            ></input>
            <button
              className="absolute right-4 top-[13px] p-1 text-[#A6ADBA] uppercase bg-black/10 border border-green-primary rounded-lg w-16"
              onClick={e => {
                e.preventDefault();
                setInputAmount(activeButton === 'mint' ? Number(userBusdBalance) : Number(userTokenBalance));
              }}
            >
              Max
            </button>
            {activeButton === 'mint' && ethers.utils.parseEther(userBusdBalance).gt(busdAllowance) && (
              <button
                className="my-4 h-12 text-[#A6ADBA] uppercase bg-black/10 border border-green-primary rounded-lg w-full"
                type="submit"
                value="Approve USDT"
                disabled={!mintApproval}
                onClick={e => {
                  e.preventDefault();
                  mintApproval?.();
                }}
              >
                Approve USDT
              </button>
            )}
            {/* : ethers.utils.parseEther(userTokenBalance).gt(tokenAllowance) && (
                  <button
                    className="my-4 h-12 text-[#A6ADBA] uppercase bg-black/10 border border-space-pink rounded-lg w-full"
                    type="submit"
                    value="Approve Apollo"
                    disabled={!redeemApproval}
                    onClick={e => {
                      e.preventDefault();
                      redeemApproval?.();
                    }}
                  >
                    Approve Apollo
                  </button>
                )} */}
            {activeButton === 'mint' ? (
              ethers.utils.parseEther(userBusdBalance).lte(busdAllowance) && (
                <button
                  className="my-4 h-12 text-[#A6ADBA] uppercase bg-black/10 border border-green-primary rounded-lg w-full"
                  type="submit"
                  value="Mint Artemis"
                  disabled={
                    inputAmount === undefined || inputAmount <= 0 || Number(userBusdBalance) < inputAmount || !mintWrite
                  }
                  onClick={e => {
                    e.preventDefault();
                    mintWrite?.();
                  }}
                >
                  {'Mint Artemis'}
                </button>
              )
            ) : (
              <button
                className="my-4 h-12 text-[#A6ADBA] uppercase bg-black/10 border border-green-primary rounded-lg w-full"
                type="submit"
                value="Mint Artemis"
                disabled={
                  inputAmount === undefined ||
                  inputAmount <= 0 ||
                  Number(userTokenBalance) < inputAmount ||
                  !redeemWrite
                }
                onClick={e => {
                  e.preventDefault();
                  redeemWrite?.();
                }}
              >
                {'Redeem USDT'}
              </button>
            )}
          </form>
        </div>

        <div className="flex flex-row justify-between font-eudoxussans font-medium">
          {' '}
          {/* font-numans */}
          <p className="text-left">You Will Receive</p>
          <p className="text-right">
            {ethers.utils.commify(
              calculatePayout(
                inputAmount || 0,
                Number(props.price),
                activeButton === 'mint' ? mintFee : sellFee,
                activeButton === 'mint'
              ).toFixed(3)
            )}{' '}
            {activeButton === 'mint' ? '$ARTMS' : 'USDT'}
          </p>
        </div>
      </div>

      {/* <div className="m-4 max-w-[285px]"> */}

      {/* </div> */}
    </>
  );
}
