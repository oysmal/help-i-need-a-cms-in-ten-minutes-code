import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
      <Router>
        <header className="w-full bg-yellow-300">
          <div className="max-w-[1200px] mx-auto flex flex-row justify-end px-4 py-3">
            <nav className="flex flex-row">
              {cmsData?.map((page) => (
                <Link
                  key={`nav-${page.Url}`}
                  className="list-none ml-4 first:ml-0 underline uppercase text-lg"
                  to={page.Url}
                >
                  {page.Sheet}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <Routes>
          {cmsData?.map((page) => (
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
