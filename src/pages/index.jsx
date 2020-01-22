import React, { useEffect, useState } from "react";
import SunCalc from "suncalc";

import Layout from "@components/layout";
import SEO from "@components/seo";

const IndexPage = ({ data }) => {
  // Determine if it's likely to be dark outside for the user.
  // TODO Use this to swap themes accordingly.
  var [nightmode, setNightmode] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function getSuntimes({
      coords: { latitude, longitude }
    }) {
      const now = new Date();
      const times = SunCalc.getTimes(now, latitude, longitude);
      setNightmode(now < times.dawn || now > times.dusk);
    });
  }, console.error);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <a href="/posts">To the blog!</a>
    </Layout>
  );
};

export default IndexPage;
