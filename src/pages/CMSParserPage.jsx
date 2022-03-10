import React, { useEffect, useState } from "react";
import { Chart } from "../common/chart/Chart";
import { Page } from "../common/page/Page";

const CMSComponentMap = {
  H1: createH1,
  H2: createH2,
  H3: createH3,
  Paragraph: createParagraph,
  Image: createImage,
  Chart: createChart,
  Spacer: createSpacer,
};

export function CMSParserPage(props) {
  const { url } = props;
  const [cmsData, setCMSData] = useState([]);

  useEffect(() => {
    async () => {
      const res = await fetch(
        `https://help-i-need-a-cms-in-ten-minutes.vercel.app/${url}.json`,
      );
      const data = await res.json();
      setCMSData(data);
    };
  }, []);

  return <Page>{cmsData.map(parseCMSItem)}</Page>;
}

function parseCMSItem(item) {
  return CMSComponentMap[item.Type](item);
}

function createH1(item) {
  return <h1 className="text-3xl my-4">{item.Content}</h1>;
}
function createH2(item) {
  return <h2 className="text-2xl my-3">{item.Content}</h2>;
}
function createH3(item) {
  return <h3 className="text-xl my-2">{item.Content}</h3>;
}
function createParagraph(item) {
  return <p className="my-2">{item.Content}</p>;
}
function createImage(item) {
  return <img className="my-2" src={item.Link} alt={item.Content} />;
}
function createSpacer(item) {
  return <div className="w-full h-8" />;
}
function createChart(item) {
  return <Chart item={item} />;
}
