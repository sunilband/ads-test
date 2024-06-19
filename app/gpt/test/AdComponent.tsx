"use client";
import React, { useEffect } from "react";
import Script from "next/script";

type Props = {
  slot?: string;
  sizes?: string[];
};

declare global {
  interface Window {
    googletag: {
      cmd: Array<() => void>;
      defineSlot?: (a: string, b: any, c: string) => any;
      pubads?: () => any;
      enableServices?: () => void;
      display?: (a: string) => void;
    };
  }
}

const AdComponent = (props: Props) => {
  useEffect(() => {
    // Define the ad slot
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      if (window.googletag?.defineSlot && window.googletag?.pubads) {
        const slot = window.googletag.defineSlot(
          "/6355419/Travel/Europe/France/Paris",
          [300, 250],
          "banner-ad",
        );
        slot?.addService(window.googletag.pubads());
      }
      // Enable the PubAdsService
      window.googletag?.enableServices?.();
      // Request and render an ad for the "banner-ad" slot
      window.googletag?.display?.("banner-ad");
    });
  }, []);

  return (
    <>
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="lazyOnload"
      />
      <div id="banner-ad" style={{ width: "300px", height: "250px" }}></div>
    </>
  );
};

export default AdComponent;
