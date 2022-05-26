import * as React from "react";
import { useParams } from "react-router-dom";

import ClubAPI from "core/api";
import { ResponseData } from "core/types";

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
    <main>
      <h1>{data.club.name}</h1>
      <h2>{data.club.coverUrl}</h2>
      <h3>{data.club.description}</h3>
    </main>
  ) : null;
}
export default Detail;
