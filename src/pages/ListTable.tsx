import React from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
let x = 3;
const ListTable = () => {
  const [items, setItems] = React.useState([1, 2, 3]);

  const addItems = () => {
    x++;
    setItems((prev) => [...prev, x]);
  };

  const removeItem = (item: any) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className="p-20">
      <div>
        <button onClick={addItems} className="border rounded w-8 h-8">
          Add
        </button>
      </div>
      <table className="border w-full">
        <thead>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col 3</th>
          </tr>
        </thead>
        <tbody className="relative">
          <AnimatePresence>
            {items.map((ele) => {
              return <TR ele={ele} removeItem={removeItem} key={ele} />;
            })}
          </AnimatePresence>
        </tbody>
      </table>
      {/* <ul className="mt-8 border rounded p-7">
        <AnimatePresence initial={false}>
          {items.map((ele) => {
            return (
              <motion.li
                key={ele}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex justify-between py-2 border-b">
                  <span>Item {ele}</span>
                  <button
                    className="border rounded w-8 h-8"
                    onClick={() => removeItems(ele)}
                  >
                    &times;
                  </button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul> */}
    </div>
  );
};

function TR({ ele, removeItem }: any) {
  const isPresent = useIsPresent();

  return (
    <motion.tr
      key={ele}
      layout
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        opacity: { duration: 0.2 },
      }}
      style={{
        position: isPresent ? "relative" : "absolute",
        display: isPresent ? "table-row" : "flex",
        alignItems: isPresent ? "" : "center",
      }}
      className="w-full"
    >
      <td className="w-1/3">1 item {ele} </td>
      <td className="w-1/3">1 item {ele} </td>
      <td className="w-1/3 text-center">
        <button onClick={() => removeItem(ele)}>&times;</button>
      </td>
    </motion.tr>
  );
}

export default ListTable;
