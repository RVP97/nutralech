"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

export function ReadingProgress() {
  const [endY, setEndY] = React.useState(0);
  const [visibility, setVisibility] = React.useState("hidden");

  const updateEndY = () => {
    const element = document.getElementById("blog-post");
    if (element) {
      const elementBottom =
        element.getBoundingClientRect().bottom + window.scrollY;
      setEndY(elementBottom - window.innerHeight);
      setVisibility("visible");
    }
  };

  React.useEffect(() => {
    setEndY(window.innerHeight);
    updateEndY();
    window.addEventListener("resize", updateEndY);
    return () => window.removeEventListener("resize", updateEndY);
  }, []);

  const { scrollY } = useScroll();
  const scaleX = useTransform(scrollY, [0, endY], [0, 1]);

  return (
    <motion.div
      initial={{ visibility: "hidden" }}
      animate={{ visibility: visibility as "hidden" | "visible" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "8px",
        backgroundColor: "#DA5F6F",
        scaleX,
        originX: 0,
        zIndex: 50,
      }}
    />
  );
}
