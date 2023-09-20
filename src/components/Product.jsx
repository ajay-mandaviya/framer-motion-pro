import React from "react";

import ProductImage from "../assets/product.png";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
//svgs
// import { ReactComponent as Close } from "../assets/close.svg";
// import { ReactComponent as Chevron } from "../assets/chevron.svg";
// import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";

const Product = () => {
  const x = useSpring(0, { stiffness: 300, damping: 200 });
  const width = useTransform(x, [-1060, 0], [350, 0]);
  const scale = useTransform(x, [-100, 0], [1.24, 1]);
  const fadeIn = useTransform(x, [-100, 0], [1, 0]);
  const [state, setState] = React.useState(false);

  React.useEffect(() => {
    x.onChange(() => {
      x.get() >= -100 ? setState(false) : setState(true);
    });
  }, []);

  return (
    <div className="product">
      <div className="product-inner">
        <div className="product-content">
          <div className="product-content-inner">
            <h4>Freedom Everywhere</h4>
            <h1>HiFive1 Rev B</h1>
            <p>
              HiFive1 is a low-cost, Arduino-compatible development board
              featuring the Freedom E310. It’s the best way to start prototyping
              and developing your RISC‑V applications.
            </p>
            <div className="btn-row">
              <button>Buy Now ($59)</button>
              {/* <DownArrow /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="product-slide-enlarge">
        <motion.div
          style={{ opacity: fadeIn }}
          className="background"
        ></motion.div>
        {state && (
          <AnimatePresence>
            <motion.div
              className="product-drag-header"
              initial={{ opacity: 0, y: -39 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <div className="company-name">HiFive1</div>
              <div className="close">{/* <Close /> */}</div>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="product-container">
          <motion.div
            className="product-image"
            drag={"x"}
            dragConstraints={{ left: -1060, right: 0 }}
            // dragElastic={0.05}
            style={{ x, scale }}
          >
            <img src={ProductImage} alt="product" />
          </motion.div>
        </div>
        <div className="product-drag">
          <div className="product-drag-inner">
            <div className="product-drag-label">
              <h6>
                {/* <Chevron /> */}
                Drag To Enlarge
              </h6>
            </div>
            <motion.div
              className="product-drag-progress-background"
              style={{ x }}
            >
              <motion.div
                style={{ width }}
                className="product-drag-progress"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
