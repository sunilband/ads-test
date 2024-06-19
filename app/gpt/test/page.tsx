import React from "react";
import Script from "next/script";
import Head from "next/head";
import AdComponent from "./AdComponent";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdComponent />
    </div>
  );
};

export default page;
