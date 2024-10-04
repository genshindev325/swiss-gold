// src/components/Header.tsx

'use client'

import Image from "next/image";

interface IGraphPanel {
  positionNumber: number;
  percentUp: number;
  cost: number;
  current: number;
  PNL: string;
}

const GraphPanel: React.FC<IGraphPanel> = ({ positionNumber, percentUp, cost, current, PNL }) => {
  return (
    <div className="flex flex-col items-center py-4">
      {/* chart card */}
      <div className="border border-yellow-500 bg-yellow-200/10 rounded-3xl py-4 mb-2">
        <div className="px-4 items-start text-xl text-white">
          Position {positionNumber}
        </div>
        <div className="flex flex-row px-4 items-center text-xl">
          <div className='my-auto mr-2'>
            <Image src={'/image/icon-up.png'} alt='up' width={14} height={8} />
          </div>
          <h2 className='text-[#00D320] text-xl'>%{percentUp}</h2>
        </div>
        <div>
          <Image src={'/image/chart.png'} alt="chart" width={230} height={133} />
        </div>
      </div>
      {/* cost description */}
      <div className="text-yellow-400 md:text-md xl:text-xl font-semibold">
        Cost: ${cost}
      </div>
      <div className="text-yellow-400 md:text-md xl:text-xl font-semibold">
        Current: ${current}
      </div>
      <div className="flex flex-row md:text-md xl:text-xl font-semibold">
        <h2 className="text-yellow-400">PNL:&nbsp;</h2>
        <h2 className="text-[#00D320]">{PNL}</h2>
      </div>
    </div>
  )
}

export default GraphPanel;