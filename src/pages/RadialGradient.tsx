import React, { useEffect, useState } from "react";
import {
  MotionValue,
  motion,
  stagger,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
const RadialGradient = () => {
  let [items, setItems] = useState([
    { id: "1", text: "One", checked: true },
    { id: "2", text: "Two", checked: true },
    { id: "3", text: "Three", checked: true },
    { id: "4", text: "Four", checked: false },
    { id: "5", text: "Five", checked: true },
    { id: "6", text: "Six", checked: true },
    { id: "7", text: "Seven", checked: true },
  ]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: any) => {
    const { top, left } = currentTarget?.getBoundingClientRect();
    console.log("sdsd", currentTarget?.getBoundingClientRect());

    console.log({ clientX, clientY });

    const xPosition = clientX - left;
    const yPosition = clientY - top;
    mouseX.set(xPosition);
    mouseY.set(yPosition);
    console.log("xposition", xPosition, yPosition);
  };

  // another
  const [ref, animate] = useAnimate();
  function handleChange(id: string) {
    let newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);
    if (newItems.every((item) => item.checked)) {
      const lastComplete = items.findIndex((item) => !item.checked);

      // scale bound
      // animate(
      //   "input",
      //   { scale: [1, 1.4, 1], accentColor: ["default", "#16a34a"] },
      //   { duration: 0.7, delay: stagger(0.1, { from: lastComplete }) }
      // );
      //shimmy
      // animate(
      //   "input",
      //   { x: [0, 2, -2, 0] },
      //   { duration: 0.4, delay: stagger(0.1, { from: lastComplete }) }
      // );
      animate(
        "input",
        { rotate: [0, 15, -15, 0] },
        { duration: 0.3, delay: stagger(0.1, { from: lastComplete }) }
      );
    }
  }
  let [count, setCount] = useState(0);

  return (
    <>
      <div
        className="group relative max-w-md rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(14, 165, 233, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        <div>
          <h3 className="text-base font-semibold leading-7 text-sky-500">
            Byline
          </h3>
          <div className="mt-2 flex items-center gap-x-2">
            <span className="text-5xl font-bold tracking-tight text-white">
              Hero
            </span>
          </div>
          <p className="mt-6 text-base leading-7 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
            illum eum ullam nostrum atque quam.
          </p>
        </div>
      </div>
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col rounded bg-gray-100 px-3 py-4 shadow-xl">
          <p className="ml-2 flex items-center text-lg font-semibold text-gray-700">
            Checklist
          </p>

          <div className="mt-4" ref={ref}>
            {items.map((item) => (
              <label
                key={item.id}
                className={`group flex w-full cursor-pointer select-none items-center rounded p-2 text-sm font-medium transition-colors duration-300 checked:text-gray-300 hover:bg-gray-200 ${
                  item.checked ? "text-gray-400 line-through" : "text-gray-800"
                }`}
              >
                <input
                  onChange={() => handleChange(item.id)}
                  checked={item.checked}
                  type="checkbox"
                  className="mr-4 h-4 w-4 rounded-sm border-2 border-gray-300 text-sky-600 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-sky-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-sky-600 group-active:checked:text-sky-600/25"
                />
                {item.text}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-1/2 justify-center">
          <div className="flex-col text-center">
            <p>Count: {count}</p>
            <div className="mt-4">
              <input
                type="number"
                value={count}
                min={0}
                onChange={(e) => setCount(+e.target.value)}
                className="w-20 p-1"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 items-end justify-center">
          <Counter value={count} />
        </div>
      </div>
    </>
  );
};

function Counter({ value }: { value: number }) {
  const animatedValue = useSpring(value);
  useEffect(() => {
    animatedValue?.set(value);
  }, [animatedValue, value]);
  return (
    <div className="flex h-6 ring-2 ring-red-500 overflow-hidden">
      <div className="relative w-6">
        {[...Array(10).keys()].map((i) => (
          <Number mv={animatedValue} place={100} number={i} key={i} />
        ))}
      </div>
      <div className="relative w-6">
        {[...Array(10).keys()].map((i) => (
          <Number mv={animatedValue} place={10} number={i} key={i} />
        ))}
      </div>
      <div className="relative w-6">
        {[...Array(10).keys()].map((i) => (
          <Number mv={animatedValue} place={1} number={i} key={i} />
        ))}
      </div>
    </div>
  );
}

function Number({
  place,
  mv,
  number,
}: {
  place: number;
  mv: MotionValue;
  number: number;
}) {
  let y = useTransform(mv, (latest: any) => {
    let height = 24;
    let placeValue = (latest / place) % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{
        y,
      }}
      className="absolute inset-0 flex justify-center"
    >
      {number}
    </motion.span>
  );
}
export default RadialGradient;
