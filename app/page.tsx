'use client';

import { useState } from 'react';
import Image from 'next/image';
import Slider from './components/Slider';
import AngleTool from './components/AngleTool';
import iphoneMockup from '../public/iphone-mockup.png';

export default function Home() {
  const [angleToolProps, setAngleToolProps] = useState<{
    arcSize: number;
    knobSize: number;
    strokeWidth: number;
  }>({
    arcSize: 0.25,
    knobSize: 16,
    strokeWidth: 2
  });

  const [isAngleToolVisible, setIsAngleToolVisible] = useState(false);

  return (
    <main className="select-none font-sans max-w-[1000px] m-auto cursor-default">
      <div className="flex select-text text-sm m-6  justify-between">
        <div className="flex gap-20">
          <div>
            <p>Max Steitle</p>
            <p className="text-gray-400">Design Engineer</p>
          </div>
          <div className="max-[1000px]:hidden">
            <p>Angle Tool</p>
            <p className="text-gray-400">Typescript</p>
          </div>
          <div className="max-[1000px]:hidden">
            <p>Brilliant Prototype</p>
            <p className="text-gray-400">2024</p>
          </div>
        </div>

        <a
          href="https://github.com/Maxsteitle/Angle-finder"
          target="_blank"
          className="flex flex-col items-end">
          <p>Source Code</p>
          <p className="text-gray-400">View in Github</p>
        </a>
      </div>

      <div className="flex gap-6 mb-16 max-[1000px]:hidden">
        <div className="bg-[#F5F5F5] p-12 w-6/12 rounded-xl relative">
          <div>
            <Image
              className="pointer-events-none"
              src={iphoneMockup}
              alt="iPhone Mockup"
            />
            {isAngleToolVisible && (
              <AngleTool
                left={172}
                top={311}
                diameter={200}
                knobSize={angleToolProps.knobSize}
                innerArcPercentage={angleToolProps.arcSize}
                strokeWidth={angleToolProps.strokeWidth}
              />
            )}
            <div className="flex justify-center">
              <button
                className="bg-black text-white text-sm py-3 w-40 rounded-full "
                onClick={() => setIsAngleToolVisible(!isAngleToolVisible)}>
                {isAngleToolVisible ? 'Hide angle tool' : 'Show angle tool'}
              </button>
            </div>
          </div>
        </div>

        <div className="w-6/12">
          <div className="flex justify-center items-center mb-6 rounded-xl h-[calc(50%-12px)]  bg-[#F5F5F5]">
            <AngleTool
              showBorder
              entryAnimation={false}
              knobSize={angleToolProps.knobSize}
              innerArcPercentage={angleToolProps.arcSize}
              strokeWidth={angleToolProps.strokeWidth}
            />
          </div>
          <div className="flex justify-center items-center rounded-xl h-[calc(50%-12px)] bg-[#F5F5F5]">
            <div className="flex flex-col gap-6 items-end">
              <Slider
                label={'knobSize'}
                value={angleToolProps.knobSize}
                setValue={setAngleToolProps}
                min={2}
                max={30}
              />
              <Slider
                label={'arcSize'}
                value={angleToolProps.arcSize}
                setValue={setAngleToolProps}
                min={0.05}
                max={1}
                step={0.05}
              />
              <Slider
                label={'strokeWidth'}
                value={angleToolProps.strokeWidth}
                setValue={setAngleToolProps}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-full my-80 text-sm text-gray-400 items-center justify-center max-[1000px]:flex font-mono">
        Resize window to 1000px
      </div>
    </main>
  );
}
