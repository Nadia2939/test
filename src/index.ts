type NavItem = {
  name: string;
  link: string;
  active?: boolean;
};

type InfoItem = {
  index: number;
  title: string;
  text: string;
};

export const NAV_ITEMS: Array<NavItem> = [
  {
    name: 'BUY MNLT',
    link: '',
  },
  {
    name: 'DISCORD',
    link: 'https://discord.gg/CrescentSwap',
  },
  {
    name: 'TWITTER',
    link: 'https://twitter.com/CrescentSwap',
  },
];

export const INFOS: Array<InfoItem> = [
  {
    index: 1,
    title: 'SUSTAINABLE GROWTH',
    text: 'Our 6% buy and 6% sell tax is hardcoded to help hold and appreciate value forever by providing a safe investment that cannot depreciate in value, being fully backed by a stablecoin.',
  },
  {
    index: 2,
    title: 'COMMUNITY DRIVEN',
    text: 'Our community has been involved from design to execution, ensuring we deliver on their needs. We will continue to prioritize community involvement in all of our endeavors and keep the community involved in every step along the way.',
  },
  {
    index: 3,
    title: 'BACKED AND SECURE',
    text: 'The price is 100% backed by BEP-20 USDT ensuring that we will always have assets backing the token. These USDT assets will have no other function and are impossible to be removed from the contract.',
  },
  {
    index: 4,
    title: 'ECOSYSTEM SUPPORTIVE',
    text: 'Closely connected to the CrescentDao ecosystem, provided as a whitelabel solution by $ARTMS, the Artemis token helps to bolster and artificially provide appreciation to $MNLT. 3% of tax will go towards increasing the price of Artemis while 2% of the Artemis tax will also be used for buying back $MNLT.',
  },
];
