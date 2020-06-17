import React, { Suspense } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { dateToHours } from "../../lib/dates";
import "./style.css";
import { APIReaderLatestNews, LatestNewsArticle } from "../../typings/app/app";

interface Props {
  latestNews: APIReaderLatestNews;
}

function News(props: Props) {
  const { latestNews } = props;
  const rss = latestNews.read();
  return (
    <div>
      <DashboardHeader />
      <div id="news" className="news-container container">
        {rss.items.map((item: LatestNewsArticle) => (
          <div className="news-row row">
            <a href={item.link} target="_blank">
              {item.title}
            </a>
            <div>
              <p>{item.sourceName}</p> <p>・</p>{" "}
              <p>{dateToHours(item.pubDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <News {...props} />
  </Suspense>
);
