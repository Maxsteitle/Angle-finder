type SliderProps = {
  value: number;
  setValue: (
    value: (prev: {
      arcSize: number;
      knobSize: number;
      strokeWidth: number;
    }) => { arcSize: number; knobSize: number; strokeWidth: number }
  ) => void;
  min: number;
  max: number;
  label: string;
  step?: number;
};

const Slider = ({
  value,
  setValue,
  label,
  min,
  max,
  step = 1
}: SliderProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(
      (prev: { arcSize: number; knobSize: number; strokeWidth: number }) => ({
        ...prev,
        [label]: parseFloat(event.target.value)
      })
    );

  return (
    <div className="flex items-center text-sm gap-6 font-mono">
      <p>{label}</p>
      <input
        className={
          'appearance-none w-24 h-10 bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-[#E0E0E0] [&::-webkit-slider-runnable-track]:h-[40px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[40px] [&::-webkit-slider-thumb]:w-[24px] [&::-webkit-slider-thumb]:rounded-lg [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[#E0E0E0] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-4'
        }
        step={step}
        type={'range'}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
