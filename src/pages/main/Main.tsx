import * as React from "react";
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";

import eqaul from "deep-equal";

import useAsync, { State } from "hooks/useAsync";

import { Primitive } from "style";
import { Filter, Search, TinyToast } from "./components";
import { ReactComponent as Spinner } from "assets/icons/spinner.svg";

import ClubAPI from "core/api";

import { ResponseData } from "core/types";

import { getAPIFilterOption, calculateStartDay, mapQueryOption } from "./helpers";
import { QueryOption } from "./types";

const Grid = styled(Primitive.UL)`
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  row-gap: 24px;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0px 20px;
    column-gap: 24px;
    margin-bottom: 120px;
  }

  @media (min-width: 1200px) {
    margin: auto;
    margin-top: 64px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0;
    column-gap: 24px;
    row-gap: 36px;
    margin-bottom: 150px;
  }

  & li {
    position: relative;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.color.g[200]};
    border-left: none;
    border-right: none;
    margin: auto;
    padding-bottom: 16px;

    @media (min-width: 768px) {
      border-left: 1px solid ${({ theme }) => theme.color.g[200]};
      border-right: 1px solid ${({ theme }) => theme.color.g[200]};
    }
  }

  & div {
    width: calc(100% - 20px);
    height: auto;
    margin: auto;
    margin-top: 12px;
    position: relative;

    & > h2 {
      color: ${({ theme }) => theme.color.g[300]};
      font-size: ${({ theme }) => `${theme.fontSize[400]}px`};
      font-weight: 800;
      margin-bottom: 8px;
    }

    & > h3 {
      color: ${({ theme }) => theme.color.g[200]};
      font-size: ${({ theme }) => `${theme.fontSize[200]}px`};
      font-weight: 700;
      margin-bottom: 10px;
    }

    & > p {
      line-height: 125%;
      color: ${({ theme }) => theme.color.g[300]};
      font-size: ${({ theme }) => `${theme.fontSize[100]}px`};
      font-weight: 500;
      margin-bottom: 36px;
    }
  }
  & span {
    font-weight: 700;
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: ${({ theme }) => theme.color.g[300]};
    font-size: ${({ theme }) => `${theme.fontSize[100]}px`};
  }
`;

const Banner = styled(Primitive.IMG)`
  height: 250px;
`;

const TABLET = 768;
const DESKTOP = 1200;

function Main() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, run } = useAsync<ResponseData>();
  const { status, data, error } = state;

  const [offset, setOffset] = React.useState(0);
  const limitRef = React.useRef(
    window.innerWidth < TABLET ? 6 : window.innerWidth > DESKTOP ? 18 : 12
  );
  const [hasNext, setHasNext] = React.useState(true);

  const lastQueryOptionRef = React.useRef<QueryOption>(mapQueryOption(searchParams));

  React.useEffect(() => {
    if (!hasNext) {
      return;
    }

    const filterOption = mapQueryOption(searchParams);
    const isEqualFilter = eqaul(lastQueryOptionRef.current, filterOption);

    const promise = ClubAPI.listByFilter(getAPIFilterOption(filterOption)).then((data) => {
      lastQueryOptionRef.current = filterOption;
      if (isEqualFilter && offset === 0) {
        setOffset(0);
        setHasNext(1 < data.length);
        return data.slice(0, limitRef.current);
      }

      setHasNext(offset + 1 < data.length);
      return (state: State<ResponseData>) =>
        Array.isArray(state.data)
          ? state.data.concat(data.slice(offset, offset + limitRef.current))
          : data;
    });

    run(promise, isEqualFilter && offset === 0);
  }, [searchParams, offset, run, hasNext]);

  React.useEffect(() => {
    function onResize() {
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

  return (
    <main>
      <Filter>
        <Search />
        {status === "loading" ? (
          <Spinner />
        ) : (
          <Grid>
            {data?.map(({ club, leaders }, i, { length }) => {
              return (
                <li
                  ref={i + 1 === length ? lastElementRef : null}
                  role="presentation"
                  onKeyUp={navigateToDetailPage(club.id)}
                  onClick={navigateToDetailPage(club.id)}
                  key={club.id}
                >
                  <Banner src={club.coverUrl} alt={`The club name: ${club.name}`} />
                  <div>
                    <h2>{club.name}</h2>
                    {leaders.length > 0 && <h3>{leaders[0]["name"]}</h3>}
                    <p>{club.description}</p>
                  </div>
                  <span>{`${club.place} | 첫 모임일: ${calculateStartDay(
                    club.meetings[0].startedAt
                  )}`}</span>
                </li>
              );
            })}
          </Grid>
        )}
      </Filter>
      <TinyToast show={status === "fetching"} />
    </main>
  );
}

export default Main;
