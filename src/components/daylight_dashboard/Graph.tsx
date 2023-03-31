import {BigNumber, ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {Formatter} from 'recharts/types/component/DefaultLegendContent';
import {useContractRead} from 'wagmi';
import {CONTRACTS} from '../../typescript/contracts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}

const CustomTooltip = ({active, payload, label}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dateTimeLabel = new Date(Number(label)).toLocaleString();
    return (
      <div className="custom-tooltip">
        <p className="label">{dateTimeLabel}</p>
        <p className="label">{`Artemis : ${Number(payload[0].value).toFixed(6)}`}</p>
      </div>
    );
  }

  return null;
};

const renderLegend = (value: string, entry: any) => {
  const {color} = entry;

  return <span style={{color}}>Artemis</span>;
};

export default function Graph(props: {price: string}) {
  const apolloConfig = CONTRACTS.find(c => c.name === 'apollo');

  const [pricePoints, setPricePoints] = useState<number[]>([1]);

  const getChartData = useContractRead({
    address: apolloConfig?.address || ethers.constants.AddressZero,
    abi: [
      {
        name: 'viewAllPriceChanges',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{internalType: 'uint256[]', name: '', type: 'uint256[]'}],
      },
    ],
    functionName: 'viewAllPriceChanges',
    watch: false,
    enabled: true,
    onError: error => console.log(error),
    onSuccess: data => {
      const realData: number[] = [];
      for (let i = 0; i < data.length; i++) {
        realData.push(parseFloat(ethers.utils.formatEther(data[i])));
      }
      setPricePoints(realData);
    },
  });

  const [chartInterval, setChartInterval] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const buttons = ['1d', '7d', '30d', '90d', '1y', 'all'];

  const chartIntervalToTimestamp = (
    intervalString: string
  ): {fromTimestamp: number; toTimestamp: number; bucketDuration: number} | undefined => {
    if (intervalString === 'all') return;

    const currentTimestamp = Math.floor(Date.now());
    let interval = 1000;
    let bucketDuration = 1000;
    switch (intervalString) {
      // case '1h':
      // 	interval = 60 * 60;
      // 	break
      case '1d':
        interval *= 60 * 60 * 24;
        bucketDuration *= (60 * 60) / 2;
        break;
      case '7d':
        interval *= 60 * 60 * 24 * 7;
        bucketDuration *= 60 * 60 * 2;
        break;
      case '30d':
        interval *= 60 * 60 * 24 * 30;
        bucketDuration *= 60 * 60 * 12;
        break;
      case '90d':
        interval *= 60 * 60 * 24 * 30 * 3;
        bucketDuration *= 60 * 60 * 16;
        break;
      case '1y':
        interval *= 60 * 60 * 24 * 365;
        bucketDuration *= 60 * 60 * 16;
        break;
      default:
        interval = 0;
        bucketDuration *= 60 * 60 * 16;
        break;
    }
    return {fromTimestamp: currentTimestamp - interval, toTimestamp: currentTimestamp, bucketDuration};
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setChartInterval('all');
  //   fetch(`/api/tokenprices/read?bucketduration=${1000 * 60 * 60 * 16}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setChartData(data);
  //       setLoading(false);
  //     });
  // }, []);
  // useEffect(() => {
  //   const options = chartIntervalToTimestamp(chartInterval);
  //   const URI = `/api/tokenprices/read${
  //     options?.fromTimestamp && options.toTimestamp
  //       ? `?start=${options.fromTimestamp}&end=${options.toTimestamp}&bucketduration=${options.bucketDuration}`
  //       : `?bucketduration=${1000 * 60 * 60 * 16}`
  //   }`;
  //   setLoading(true);
  //   fetch(URI)
  //     .then(res => res.json())
  //     .then(data => {
  //       setChartData(data);
  //       setLoading(false);
  //     });
  // }, [chartInterval]);

  const renderLineChart = (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={250} data={pricePoints} margin={{top: 5, right: 0, bottom: 5, left: 0}}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dy={5} //move x axis label down to improve spacing
          minTickGap={60} //20 is good, 60 for no x label
          dataKey="timestamp"
          tickFormatter={timestamp => ''}
          // {
          //   return new Date(Number(timestamp)).toLocaleString('default', {
          //     month: '2-digit',
          //     day: '2-digit',
          //     // hour: 'numeric',
          //     // minute: 'numeric',
          //   });
          // }}
        />
        <YAxis
          domain={[
            (dataMin: number) => (dataMin / 1.05).toFixed(2),
            (dataMax: number) => (dataMax * 1.05).toFixed(2),
            // (dataMin: BigNumber) => (parseFloat(ethers.utils.formatEther(dataMin === null ? BigNumber.from('1000000000000000000') : dataMin) || '1').toFixed(2)),
            // (dataMax: BigNumber) => (parseFloat(ethers.utils.formatEther(dataMax === null ? BigNumber.from('1000000000000000000') : dataMax) || '1').toFixed(2))
          ]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderLegend} />
        <Line type="monotone" dataKey="value" stroke="#c70000" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <div className="p-2 md:p-4 bg-black/50 border border-green-primary rounded-lg w-full content-center relative">
        <div className="flex justify-evenly items-center py-4 font-orbitron">
          <h1 className="align-middle text-xl text-white/70 font-bold">Artemis Price</h1>
          <h3 className="align-middle text-lg font-bold">{props.price} USDT</h3>
        </div>

        <div className="pr-4 pb-4">{renderLineChart}</div>

        {/* //represented by 'dataKey' in recharts Line element
        <div>
          <h2 className="text-center font-bold text-xl">APOLLO</h2>
        </div>
        */}

        <div className="flex justify-center">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`mx-1 md:mx-2 my-4 w-12 h-14 bg-black/10 border border-green-primary rounded-lg text-[.6rem] ${
                chartInterval === button ? 'bg-green-primary text-black' : 'text-white'
              }`}
              onClick={() => setChartInterval(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
