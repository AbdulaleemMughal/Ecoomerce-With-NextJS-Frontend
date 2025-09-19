"use client";

import { useEffect, useState } from "react";

export const useResponsiveness = () => {
  const [laptopMode, setLaptopMode] = useState<boolean>(false);
  const [tabletMode, setTabletMode] = useState<boolean>(false);
  const [mobileMode, setMobileMode] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setLaptopMode(true);
      } else {
        setLaptopMode(false);
      }

      if (window.innerWidth <= 768) {
        setTabletMode(true);
      } else {
        setTabletMode(false);
      }

      if (window.innerWidth <= 640) {
        setMobileMode(true);
      } else {
        setMobileMode(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    tabletMode,
    mobileMode,
    laptopMode,
  };
};
