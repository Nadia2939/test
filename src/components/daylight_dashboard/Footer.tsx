// images
import Image from 'next/image';
// import Telegram from '../../../public/images/social/telegram.svg';
import Medium from '../../../public/images/social/medium.svg';
import Twitter from '../../../public/images/social/twitter.svg';
import Discord from '../../../public/images/social/discord.svg';
import Logo from '../../../public/images/logos/logo_white.svg';
import Logo_Safuu from '../../../public/images/logos/Moonshine_1-p-500.png';

const date = new Date();

export default function Footer() {
  const socialLinks = [
    // {
    //   link: 'https://www.safuu.com/',
    //   image: <Website />,
    // },
    // {
    //   link: '',
    //   image: <Medium />,
    // },
    {
      link: 'https://twitter.com/CrescentSwap',
      image: <Twitter />,
    },
    {
      link: 'https://discord.gg/CrescentSwap',
      image: <Discord />,
    },
  ];

  return (
    <footer className="py-8 mx-auto w-full">
      {/* image */}
      <div className="flex justify-center w-full py-4 mb-4">
        <Logo />
      </div>

      {/* socials */}
      <div className="flex justify-center w-full">
        {socialLinks.map((social, index) => (
          <a className="mx-2" key={index} href={social.link} target="_blank" rel="noreferrer">
            {social.image}
          </a>
        ))}
      </div>

      {/* logo */}
      <div className="flex justify-center w-full pt-12">
        <a href="https://crescentswap.exchange/" target="_blank" rel="noreferrer">
          <Image src={Logo_Safuu} alt="Prism Icon" width={135} height={135} />
        </a>
      </div>

      {/* copyright */}
      {/* <div className="flex justify-center w-full text-sm text-white/70 mt-8 font-eudoxussans">
        Copyright © {date.getFullYear()} Safuu. All Right Reserved.
      </div> */}
    </footer>
  );
}
