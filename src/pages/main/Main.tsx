import * as React from "react";
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";

import eqaul from "deep-equal";

import * as Primitive from "../../style/primitives";
import Filter from "./components/Filter";
import Search from "./components/Search";

import ClubAPI from "core/api";
import { ResponseData } from "core/types";

import { ConvertedURLSearchParams, extractURLParams, getAPIFilterOption } from "./helpers";

const Wrapper = styled(Primitive.Main)`
  max-width: 1200px;
`;

function Main() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // TODO: improve this business flow logic for tiny async hook
  const [list, setList] = React.useState<ResponseData | null>(null);
  const [offset, setOffset] = React.useState(0);
  const limitRef = React.useRef(6);
  const [hasNext, setHasNext] = React.useState(false);
  const lastExtractedParamsRef = React.useRef<ConvertedURLSearchParams>();

  const navigateToDetailPage = (id: string) => () => {
    navigate(`./${id}`);
  };

  const lastElementRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      const io = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            setOffset((prev) => prev + limitRef.current);
            observer.unobserve(entry.target);
          }
        },
        { root: null, threshold: 0 }
      );
      if (hasNext) {
        io.observe(node);
      }
    },
    [hasNext]
  );

  React.useEffect(() => {
    function onResize() {
      const TABLET = 768;
      const DESKTOP = 1200;
      const width = window.innerWidth;

      if (width < TABLET) {
        limitRef.current = 6;
        return;
      }

      if (TABLET <= width && width < DESKTOP) {
        limitRef.current = 9;
        return;
      }

      if (DESKTOP <= width) {
        limitRef.current = 18;
        return;
      }
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  React.useEffect(() => {
    const currentExtractedParams = extractURLParams(searchParams);
    const filterOption = getAPIFilterOption(currentExtractedParams);

    ClubAPI.listByFilter(filterOption).then((data) => {
      if (eqaul(lastExtractedParamsRef.current, currentExtractedParams) && offset !== 0) {
        const chunks = data.slice(offset, offset + limitRef.current);
        setList((prev) => (prev ? prev.concat(chunks) : chunks));
        setHasNext(offset + 1 < data.length);
      } else {
        lastExtractedParamsRef.current = currentExtractedParams;
        setOffset(0);
        setList(data.slice(0, limitRef.current));
        setHasNext(1 < data.length);
      }
    });
  }, [searchParams, offset]);

  return (
    <Wrapper>
      <Filter>
        <Search />
        {
          <ul style={{ listStyle: "none", padding: 0 }}>
            {list?.map(({ club, leaders }, i, { length }) => {
              return (
                <li
                  ref={i + 1 === length ? lastElementRef : null}
                  role="presentation"
                  onKeyUp={navigateToDetailPage(club.id)}
                  onClick={navigateToDetailPage(club.id)}
                  key={club.id}
                  style={{ padding: 0 }}
                >
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
      </Filter>
    </Wrapper>
  );
}

// TODO
function tempCalculateDay(s: string) {
  const ymd = s.split("T")[0];
  const [y, m, d] = ymd.split("-");
  return `${Number(m) > 10 ? m[1] : m}월 ${Number(d) > 10 ? d[1] : d}일`;
}

export default Main;
