import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CMSParserPage } from "./pages/CMSParserPage";

export default function App() {
  const [cmsData, setCMSData] = useState([]);

  useEffect(() => {
    fetch(`https:booster-test.vercel.app/Pages.json`).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setCMSData(data);
    });
  }, []);

  return (
    <Router>
      <Routes>
        {cmsData.map((page) => (
          <Route path={page.Url} element={<CMSParserPage url={page.Sheet} />} />
        ))}
      </Routes>
    </Router>
  );
}
