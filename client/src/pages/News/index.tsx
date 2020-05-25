import React, { useEffect, useState } from "react";
import { dateToHours } from "../../utility/dates";
import "./style.css";
import { LatestNewsArticle } from "../../types";

interface Props {}

export default function News(props: Props) {
  const [rss, setRSS] = useState({ items: [] });

  async function fetchRSS() {
    await fetch(`${process.env.REACT_APP_SERVER}/rss`)
      .then((res) => res.json())
      .then((res) => setRSS(res))
      .catch(console.error);
  }

  useEffect(() => {
    fetchRSS();
  }, []); // empty array 2nd arg prevents re-fetching!

  return (
    <div id="news" className="news-container container">
      {rss.items.map((item: LatestNewsArticle) => (
        <div className="news-row row">
          <a href={item.link} rel="noopener" target="_blank">
            {item.title}
          </a>
          <div>
            <p>{item.sourceName}</p> <p>・</p>{" "}
            <p>{dateToHours(item.pubDate)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
