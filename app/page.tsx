'use client';

import { useState } from 'react';
import Image from 'next/image';
import Slider from './components/Slider';
import AngleTool from './components/AngleTool';
import iphoneMockup from '../public/iphone-mockup.png';

export default function Home() {
  const [arcSize, setArcSize] = useState(0.25);
  const [knobSize, setKnobSize] = useState(16);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isAngleToolVisible, setIsAngleToolVisible] = useState(false);

  return (
    <main className="select-none font-sans max-w-screen-lg m-auto cursor-default">
      <div className="flex select-text text-sm m-6 justify-between">
        <div className="flex gap-20">
          <div>
            <p>Max Steitle</p>
            <p className="text-gray-400">Design Engineer</p>
          </div>
          <div className="max-lg:hidden">
            <p>Angle Tool</p>
            <p className="text-gray-400">Typescript</p>
          </div>
          <div className="max-lg:hidden">
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

      <div className="m-auto flex w-[489px] flex-col gap-6 mb-16 lg:flex-row lg:w-auto">
        <div className="bg-[#F5F5F5] p-12 rounded-xl relative lg:w-6/12">
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
                knobSize={knobSize}
                innerArcPercentage={arcSize}
                strokeWidth={strokeWidth}
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

        <div className="w-full lg:w-6/12">
          <div className="py-12 flex justify-center items-center mb-6 rounded-xl h-[calc(50%-12px)]  bg-[#F5F5F5]">
            <AngleTool
              showBorder
              entryAnimation={false}
              knobSize={knobSize}
              innerArcPercentage={arcSize}
              strokeWidth={strokeWidth}
            />
          </div>
          <div className="py-20 flex justify-center items-center rounded-xl h-[calc(50%-12px)] bg-[#F5F5F5]">
            <div className="flex flex-col gap-6 items-end">
              <Slider
                label={'Knob'}
                value={knobSize}
                setValue={setKnobSize}
                min={4}
                max={30}
              />
              <Slider
                label={'Arc'}
                value={arcSize}
                setValue={setArcSize}
                min={0.05}
                max={1}
                step={0.05}
              />
              <Slider
                label={'Stroke'}
                value={strokeWidth}
                setValue={setStrokeWidth}
                min={0.5}
                max={6}
                step={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
