interface RadioControlProps {
  radio: number;
  setRadio: (value: number | ((prev: number) => number)) => void;
  punto: { lon: number, alt: number };
}

export default function Radio({ radio, setRadio, punto }: RadioControlProps) {
  const isDisabled = punto.alt === 0 && punto.lon === 0;

  const handleChange = (e: any) => {
    setRadio(parseInt(e.target.value));
  };

  return (
    <div
      className={`bg-gray-20 p-4 rounded-md border-2 shadow-sm w-56 mx-auto transition-opacity duration-300 ${
        isDisabled ? "opacity-30" : "opacity-100"
      }`}
    >
      <div className="mb-3">
        <span className="text-gray-700 font-medium">
          Radio: {radio} kilometro
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={20}
        value={radio}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-label="Ajustar radio"
        disabled={isDisabled}
      />
    </div>
  );
}
