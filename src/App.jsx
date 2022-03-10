import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CMSParserPage } from "./pages/CMSParserPage";

export default function App() {
  const [cmsData, setCMSData] = useState([]);

  useEffect(() => {
    fetch(
      `https://help-i-need-a-cms-in-ten-minutes.vercel.app/Pages.json`,
    ).then(async (res) => {
      const data = await res.json();
      setCMSData(data);
    });
  }, []);

  return (
    <div>
      <header className="w-full bg-yellow-300">
        <nav className="max-w-[1200px] mx-auto flex flex-row justify-end px-4 py-3">
          <ul className="flex flex-row">
            {cmsData.map((page) => (
              <li className="list-none ml-4 first:ml-0 underline uppercase text-lg">
                <a href={page.Url}>{page.Sheet}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Router>
        <Routes>
          {cmsData.map((page) => (
            <Route
              key={page.Url}
              path={page.Url}
              element={<CMSParserPage url={page.Sheet} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}
