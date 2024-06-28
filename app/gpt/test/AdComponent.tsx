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
  const [requestedAds, setRequestedAds] = React.useState<string[]>([]);
  const [renderedAds, setRenderedAds] = React.useState<string[]>([]);
  const [viewedAds, setViewedAds] = React.useState<string[]>([]);
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      if (window.googletag?.defineSlot && window.googletag?.pubads) {
        const slot = window.googletag.defineSlot(
          "/6355419/Travel/Europe/France/Paris",
          [300, 250],
          "banner-ad",
        );
        slot?.addService(window.googletag.pubads());

        const slot2 = window.googletag.defineSlot(
          "/6355419/Travel",
          ["fluid"],
          "banner-ad-2",
        );
        slot2?.addService(window.googletag.pubads());

        // Enable the PubAdsService
        window.googletag?.enableServices?.();

        // Request and render an ad for the "banner-ad" slot
        window.googletag?.display?.("banner-ad");
        window.googletag?.display?.("banner-ad-2");
      }
    });

    // add event listener for slotRenderEnded
    window.googletag?.cmd.push(() => {
      window.googletag
        ?.pubads?.()
        ?.addEventListener("slotRequested", (event: any) => {
          const slot = event.slot;
          setRequestedAds((prev) => [...prev, slot.getSlotElementId()]);
        });
    });

    // add event listener for slotRenderEnded
    window.googletag?.cmd.push(() => {
      window.googletag
        ?.pubads?.()
        ?.addEventListener("slotRenderEnded", (event: any) => {
          const slot = event.slot;
          setRenderedAds((prev) => [...prev, slot.getSlotElementId()]);
        });
    });

    // add event listener for impressionViewable
    window.googletag?.cmd.push(() => {
      window.googletag
        ?.pubads?.()
        ?.addEventListener("impressionViewable", (event: any) => {
          const slot = event.slot;
          setViewedAds((prev) => [...prev, slot.getSlotElementId()]);
        });
    });

    return () => {
      // @ts-ignore
      window.googletag = undefined;
    };
  }, []);

  return (
    <>
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="lazyOnload"
      />
      <div className="w-screen h-screen  p-2 border">
        <h1 className="font-semibold">
          Events for ads will appear here (scroll down the ads are below)
        </h1>

        <h2 className="text-bold text-xl text-red-500 mt-10">Requested Ads</h2>
        <ul>
          {requestedAds.map((ad) => (
            <li key={ad}>{ad} was requested</li>
          ))}
        </ul>

        <h2 className="text-bold text-xl text-yellow-500 mt-10">
          Request ended Ads
        </h2>
        <ul>
          {requestedAds.map((ad) => (
            <li key={ad}>{ad} was rendered</li>
          ))}
        </ul>

        <h2 className="text-bold text-xl text-green-500 mt-10">Viewed Ads</h2>

        <ul>
          {viewedAds.map((ad) => (
            <li key={ad}>{ad} was viewed</li>
          ))}
        </ul>
      </div>
      {/* ads */}
      Test ad
      <div id="banner-ad" style={{ width: "300px", height: "250px" }}></div>
      Fluid ad
      <div id="banner-ad-2"></div>
    </>
  );
};

export default AdComponent;
