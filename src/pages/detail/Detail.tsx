import * as React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

import { Primitive } from "style";

import ClubAPI from "core/api";
import { ResponseData } from "core/types";

const Wrapper = styled(Primitive.Main)`
  & > div {
    padding: 0px 20px;
    margin-top: 20px;

    & > h1 {
      font-size: ${({ theme }) => `${theme.fontSize[300]}px`};
      font-weight: 800;
      margin-bottom: 18px;
    }

    & > h2 {
      font-size: ${({ theme }) => `${theme.fontSize[200]}px`};
    }

    & .tag {
      margin-bottom: 20px;
      & span {
        display: inline-block;
        padding: 8px 18px;
        margin-right: 10px;
        border-radius: 12.5px;
        font-weight: 700;
        background-color: ${({ theme }) => theme.color.r[300]};
        color: ${({ theme }) => theme.color.g[100]};
      }
    }

    & h3 {
      line-height: 150%;
      font-size: ${({ theme }) => `${theme.fontSize[200]}px`};
      color: ${({ theme }) => theme.color.g[300]};
    }
  }
`;

const TopImage = styled(Primitive.IMG)`
  height: 400px;

  @media (min-width: 768px) {
    object-position: center;
  }
`;

function Detail() {
  const { id } = useParams();
  const [data, setData] = React.useState<ResponseData[number] | undefined>(undefined);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    ClubAPI.detail(id).then((data) => setData(data));
  }, [id]);

  return data ? (
    <Wrapper>
      <TopImage src={data.club.coverUrl} alt={data.club.name} />
      <div>
        <h1>{data.club.name}</h1>
        <div className="tag">
          <span>{data.club.type}</span>
          <span>{data.club.place}</span>
        </div>
        <h3>{data.club.description}</h3>
      </div>
    </Wrapper>
  ) : null;
}
export default Detail;
