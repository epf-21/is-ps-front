
interface RadioControlProps {
  radio: number;
  setRadio: (value: number | ((prev: number) => number)) => void;
}
export default function Radio({ radio, setRadio }: RadioControlProps) {
  const increment = () => setRadio(prev => prev + 1);
  const decrement = () => setRadio(prev => Math.max(prev - 1, 0));
  const reset = () => setRadio(0);
  return (
    <div className="bg-black text-white text-center p-2 rounded-md shadow-sm w-fit mx-auto">
      <h2 className="text-sm font-medium mb-2">Radio: {radio}</h2>
      <div className="space-x-1">
        <button
          onClick={decrement}
          className="bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-400 text-xs px-2 py-1 rounded"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  )
}