import * as React from "react";
import eqaul from "deep-equal";
import { useSearchParams } from "react-router-dom";

import Filter from "./components/Filter";
import Search from "./components/Search";

import { ConvertedURLSearchParams, extractURLParams, getAPIFilterOption } from "./helpers";
import ClubAPI from "core/api";
import { ResponseData } from "core/types";

function Main() {
  const [searchParams] = useSearchParams();
  const lastExtractedParamsRef = React.useRef<ConvertedURLSearchParams>();

  // TODO: improve this business flow logic for tiny async hook
  const [list, setList] = React.useState<ResponseData | null>(null);

  React.useEffect(() => {
    const currentExtractedParams = extractURLParams(searchParams);
    if (
      eqaul(lastExtractedParamsRef.current, currentExtractedParams) &&
      Object.keys(currentExtractedParams).length > 0
    ) {
      return;
    }
    lastExtractedParamsRef.current = currentExtractedParams;
    const filterOption = getAPIFilterOption(currentExtractedParams);

    ClubAPI.listByFilter(filterOption).then((data) => {
      setList(data);
    });
  }, [searchParams]);

  return (
    <>
      <Filter />
      <Search />
      {
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list?.map(({ club, leaders }) => {
            return (
              <li key={club.id} style={{ padding: 0 }}>
                <div>
                  <div style={{ width: "100%" }}>
                    <img
                      src={club.coverUrl}
                      style={{ objectFit: "cover", maxHeight: "200px" }}
                      alt={`The club name: ${club.name}`}
                    />
                    <h2>{club.name}</h2>
                    {leaders.length > 0 && <h3>{leaders[0]["name"]}</h3>}
                    <p>{club.description}</p>
                  </div>
                  <div>
                    <span>{`${club.place} | 첫 모임일: ${tempCalculateDay(
                      club.meetings[0].startedAt
                    )}`}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      }
    </>
  );
}

// TODO
function tempCalculateDay(s: string) {
  const ymd = s.split("T")[0];
  const [y, m, d] = ymd.split("-");
  return `${Number(m) > 10 ? m[1] : m}월 ${Number(d) > 10 ? d[1] : d}일`;
}

export default Main;
