import Link from 'next/link';
import Logo from '../../../public/images/logos/logo_white.svg';
import Connect from './Connect';
import {NAV_ITEMS} from '../../constants';

import PageContext from '@/contexts/PageContext';
import MenuContext from '@/contexts/MenuContext';

import {useContext} from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
export default function MenuTop() {
  const {isOpen, setIsOpen} = useContext(MenuContext);
  const {showNav} = useContext(PageContext);
  return (
    <div className="flex flex-row items-center">
      <div className="navbar w-full mt-2 mb-4 max-w-[120rem] m-auto">
        {' '}
        {/* max-w-[67.5rem] */}
        <div className="sm:mr-20 md:mr-14 lg:mr-10 mr-4 z-10 flex-1 lg:flex-0  ">
          <Link href="/" className="pl-4 sm:flex">
            <Logo />
          </Link>
        </div>
        {/* {!isOpen && ( */}
        <div className="text-xl font-orbitron font-bold z-10 flex-1 hidden lg:flex">
          {NAV_ITEMS.map((nav, index) => (
            <a className={`mx-4 ${nav.active && 'text-green-primary'}`} key={index} href={nav.link}>
              {nav.name}
            </a>
          ))}
        </div>
        {/* )} */}
        <div className="flex-none z-10 ">
          <div className="border border-white rounded-lg font-orbitron text-xl hidden sm:flex justify-around mr-4">
            <span className="border-r border-white">
              <a
                className="btn btn-ghost normal-case rounded-none pt-1"
                href="https://docs.crescentswap.exchange/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Litepaper
              </a>
            </span>
            <a
              className="btn btn-ghost normal-case rounded-none pt-1"
              href="https://crescentswap.exchange/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </div>
          <div className="z-10 ">
            <Connect />
          </div>

          <div onClick={() => setIsOpen(!isOpen)} className="app-nav-menu-icon">
            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
