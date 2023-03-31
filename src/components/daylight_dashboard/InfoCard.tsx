import Image from 'next/image';
import infoIcon1 from '../../../public/images/icons/about-1.png';
import infoIcon2 from '../../../public/images/icons/about-2.png';
import infoIcon3 from '../../../public/images/icons/about-3.png';
import infoIcon4 from '../../../public/images/icons/about-4.png';
import webIcon from '../../../public/images/bg-grid-vertical.png'; //510 x 812
import {INFOS} from '../../constants';

const loadImage = (index: number) => {
  if (index == 0) {
    return <Image src={infoIcon1} alt="Prism Icon" width={135} height={135} />;
  } else if (index == 1) {
    return <Image src={infoIcon2} alt="Prism Icon" width={135} height={135} />;
  } else if (index == 2) {
    return <Image src={infoIcon3} alt="Prism Icon" width={135} height={135} />;
  } else if (index == 3) {
    return <Image src={infoIcon4} alt="Prism Icon" width={135} height={135} />;
  } else return;
};

export default function InfoCard() {
  return (
    <>
      <div className="grid grid-rows1 lg:grid-rows-2 grid-cols-1 lg:grid-cols-2 font-orbitron font-bold">
        {INFOS.map((item, index) => (
          <div
            className="relative m-6 left-4 lg:left-0 lg:m-2 bg-gradient-radial from-white/20 to-black border border-green-primary rounded-lg w-5/6 lg:mt-10"
            key={index}
          >
            <div className="absolute -top-3 min-[550px]:-top-4 lg:-top-3 xl:-top-4 2xl:-top-5 lg:left-8 uppercase text-2xl w-full">
              <p className="text-base min-[450px]:text-lg min-[550px]:text-xl text-center lg:text-left max-[1050px]:whitespace-nowrap lg:text-base min-[1145px]:text-lg xl:text-xl 2xl:text-2xl uppercase">
                {item.title}
              </p>
            </div>
            <div className="-z-10 absolute -left-20 top-8 min-[450px]:top-6 min-[530px]:top-3 sm:top-2 md:top-1 lg:top-6 min-[1120px]:top-3 xl:top-0 opacity-50">
              {loadImage(index)}
            </div>
            <div className="p-8 lg:p-6 font-eudoxussans font-medium text-white/70 text-sm">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
