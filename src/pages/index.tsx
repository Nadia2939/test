import {NextPage} from 'next';
// import {PRICE_ITEMS} from '../constants';
import Logo from '../../public/images/logos/logo_white.svg';

import Footer from '@/components/daylight_dashboard/Footer';
import Graph from '@/components/daylight_dashboard/Graph';
import Price from '@/components/daylight_dashboard/Price';
import Mint from '@/components/daylight_dashboard/Mint';
import InfoCard from '@/components/daylight_dashboard/InfoCard';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import PageBox from '@/components/page/box';
import {useState} from 'react';
import {useAccount, useBalance, useConnect, useContractRead, useToken} from 'wagmi';
import {CONTRACTS} from '../typescript/contracts';
import {BigNumber, ethers} from 'ethers';

type PriceItem = {
  title: string;
  price: number;
};

const PRICE_ITEMS: PriceItem[] = [
  {
    title: 'Price',
    price: 0,
  },
  {
    title: 'Market Cap',
    price: 0,
  },
  {
    title: 'Circulating Supply',
    price: 0,
  },
  {
    title: 'Backing Value',
    price: 0,
  },
];

type ContentPositionsT =
  | 'top'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'left'
  | 'right';

const Home: NextPage = () => {
  const [contentPosition, setContentPosition] = useState<ContentPositionsT>('center');
  const [showContent, setShowContent] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileNavOnly, setMobileNavOnly] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showConnectButton, setShowConnectButton] = useState(true);

  const [priceItems, setPriceItems] = useState<PriceItem[]>(PRICE_ITEMS);

  const [tokenPrice, setTokenPrice] = useState('0.00');

  const [userTokenBalance, setUserTokenBalance] = useState<string>('0.00');
  const [userBusdBalance, setUserBusdBalance] = useState<string>('0.00');

  // const [tokenAllowance, setTokenAllowance] = useState<BigNumber>(BigNumber.from(0));
  const [busdAllowance, setBusdAllowance] = useState<BigNumber>(BigNumber.from(0));

  const apolloConfig = CONTRACTS.find(c => c.name === 'apollo');
  const busdConfig = CONTRACTS.find(c => c.name === 'busd');

  const {address, isConnected} = useAccount();

  const getTokenPrice = useContractRead({
    address: '0xba440fF0aB6123446bdDDc2F24B53b7d5a900F6D',
    abi: [
      {
        inputs: [],
        name: 'calculatePrice',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'calculatePrice',
    watch: true,
    onError: error => console.log(error),
    onSuccess(data) {
      // console.log('fetched token price: ', ethers.utils.formatEther(data));
      setTokenPrice(ethers.utils.formatEther(data));

      setPriceItems(prevState =>
        prevState.map(item => {
          if (item.title === 'Price') {
            return {
              ...item,
              price: Number(parseFloat(ethers.utils.formatEther(data)).toFixed(3)),
            };
          }
          return item;
        })
      );
    },
  });

  const getValueBacking = useBalance({
    address: apolloConfig?.address,
    token: busdConfig?.address,
    watch: true,
    onError: error => console.log(error),
    onSuccess(data) {
      setPriceItems(prevState =>
        prevState.map(item => {
          if (['Market Cap', 'Backing Value'].includes(item.title)) {
            return {
              ...item,
              price: parseFloat(parseFloat(data.formatted).toFixed(3)),
            };
          }
          return item;
        })
      );
    },
  });

  const getCirculatingSupply = useContractRead({
    address: apolloConfig?.address,
    abi: [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'totalSupply',
    watch: true,
    onError: error => console.log(error),
    onSuccess(data) {
      setPriceItems(prevState =>
        prevState.map(item => {
          if (item.title === 'Circulating Supply') {
            return {
              ...item,
              // multiply this by the token price
              price: Number(parseFloat(ethers.utils.formatEther(data)).toFixed(3)),
            };
          }
          return item;
        })
      );
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

  const getBusdAllowance = useContractRead({
    address: busdConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'allowance',
        type: 'function',
        stateMutability: 'view',
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
      },
    ],
    functionName: 'allowance',
    args: [address || ethers.constants.AddressZero, apolloConfig?.address || ethers.constants.AddressZero],
    watch: true,
    onError: error => console.log(error),
    onSuccess: data => {
      setBusdAllowance(data);
    },
  });

  const getUserTokenBalance = useBalance({
    address: address,
    token: apolloConfig?.address || ethers.constants.AddressZero,
    watch: true,
    onError: error => console.log(error),
    onSuccess(data) {
      setUserTokenBalance(data.formatted);
    },
  });

  const getUserBUSDBalance = useBalance({
    address: address,
    token: busdConfig?.address || ethers.constants.AddressZero,
    watch: true,
    onError: error => console.log(error),
    onSuccess(data) {
      setUserBusdBalance(data.formatted);
    },
  });

  return (
    <>
      {/* <div className="lg:hidden h-40 flex flex-row justify-around">
        <div className="my-8">
          <LogoMobile />
        </div>
        <div className="my-8 pt-8">
          <MobileMenu />
        </div>
      </div>

      <div className="hidden lg:inline">
        <MenuTop />
      </div> */}
      <Page
        showAppContent={showContent}
        showAppFooter={showFooter}
        showAppHeader={showHeader}
        showConnectButton={showConnectButton}
        mobileNavOnly
        header="Artemis Home"
      >
        <PageContent contentPosition={contentPosition}>
          <PageBox>
            <div className="max-w-[120rem] m-auto">
              {' '}
              {/* max-w-[67.5rem] */}
              <div className="mx-[2rem] md:w-2/3 md:mx-auto relative font-orbitron font-bold">
                {' '}
                {/* ml-auto lg:infoBackground: */}
                <div className="lg:flex lg:flex-row items-center mt-10 lg:mt-4 mb-0 lg:my-10 text-5xl">
                  {/* <h1 className="text-center font-spectralsc lg:text-left">Dashboard</h1> */}
                  <h1 className="text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-green-primary/20 via-green-primary/90 to-green-primary/20">
                    Dashboard
                  </h1>
                  <hr className="h-1 w-10/12 ml-2 my-auto border-green-primary invisible lg:visible" />
                </div>
                <div className="justify-center items-center grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-4">
                  {priceItems.map((elem, index) => (
                    <div className="text-center lg:text-left lg:mb-12" key={index}>
                      <Price
                        title={elem.title}
                        price={elem.price}
                        showDollarSign={elem.title !== 'Circulating Supply'}
                      />
                    </div>
                  ))}
                </div>
                <br />
                <div className="flex justify-center flex-col-reverse gap-24 lg:flex-row lg:items-stretch lg:gap-10">
                  <div className="flex-grow">
                    <Graph price={tokenPrice} />
                  </div>
                  <div className="flex justify-center">
                    <Mint
                      price={tokenPrice}
                      userTokenBalance={userTokenBalance}
                      userBusdBalance={userBusdBalance}
                      busdAllowance={busdAllowance}
                    />
                  </div>
                </div>
                {/* render following div on mobile */}
                <div className=" mt-20 mb-9 lg:hidden">
                  <h1 className="text-center uppercase font-spectralsc text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-800">
                  Artemis
                  </h1>
                  <h2 className="text-center font-eudoxussans font-medium text-sm">
                  Artemis has a strong community and is commited to the success of the project
                  </h2>
                </div>
                {/* render following div on lg */}
                {/* <div className="my-9 hidden lg:block lg:w-full">
                  <h2 className="text-center font-spectralsc text-5xl">$Safuu a DAO community driven protocol focusing on burning tokens and creating deflation</h2>
                </div> */}
                {/* <div className="flex justify-center lg:hidden mb-8">
                  <Logo />
                </div> */}
              </div>
              {/*  NOTE: THIS BANNER NEEDS TO BE CHANGED OR REMOVED ALLTOGETHER. ON 4k screens, it is cutoff */}
              <div className="infoBackground mt-10">
                <div className="mx-[2rem] md:w-2/3 md:mx-auto relative pl-8">
                  <InfoCard />
                </div>
              </div>
            </div>

            <div className="lg:h-[312px]">
              <Footer />
            </div>

            {/* <div className="bottom-0 left-0 w-full h-[75px] bg-gradient-to-t from-space-orange to-[#121212]"></div> */}
          </PageBox>
        </PageContent>
        {/* moved full width gradient beneath footer to PageContent */}
        {/* <div className="bottom-0 left-0 w-full h-[75px] bg-gradient-to-t from-space-orange to-[#121212]/0"></div> */}
      </Page>
    </>
  );
};

export default Home;
