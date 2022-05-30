import userEvent from "@testing-library/user-event";
import { render, screen } from "test/test-utils";

import Filter from "./Filter";

const Comp = function () {
  return null;
};

test("It should show user the categories", async () => {
  render(
    <Filter>
      <Comp />
    </Filter>
  );

  expect(screen.getByRole("button", { name: /유형/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /장소/i })).toBeInTheDocument();
});

test("It should show filter options when user click category", async () => {
  render(
    <Filter>
      <Comp />
    </Filter>
  );

  await userEvent.click(screen.getByRole("button", { name: /유형 카테고리/i }));
  expect(screen.getAllByLabelText(/유형 카테고리: /i)).toMatchInlineSnapshot(`
    Array [
      <button
        aria-label="유형 카테고리: 함께 만드는 클럽"
      >
        <span>
          함께 만드는 클럽
        </span>
      </button>,
      <button
        aria-label="유형 카테고리: 클럽장 클럽"
      >
        <span>
          클럽장 클럽
        </span>
      </button>,
    ]
  `);

  await userEvent.click(screen.getByRole("button", { name: /장소 카테고리/i }));
  expect(screen.getAllByLabelText(/장소 카테고리:/i)).toMatchInlineSnapshot(`
    Array [
      <button
        aria-label="장소 카테고리: 안국"
      >
        <span>
          안국
        </span>
      </button>,
      <button
        aria-label="장소 카테고리: 강남"
      >
        <span>
          강남
        </span>
      </button>,
      <button
        aria-label="장소 카테고리: 롯데백화점 잠실점 문화센터"
      >
        <span>
          롯데백화점 잠실점 문화센터
        </span>
      </button>,
      <button
        aria-label="장소 카테고리: 온라인"
      >
        <span>
          온라인
        </span>
      </button>,
    ]
  `);

  await userEvent.click(screen.getByRole("button", { name: /취소/i }));
  expect(screen.queryAllByLabelText(/장소 카테고리: /i).length).toBe(0);
  expect(screen.queryAllByLabelText(/유형 카테고리: /i).length).toBe(0);
});

test("The URL change based on filters", async () => {
  render(
    <Filter>
      <Comp />
    </Filter>
  );
  await userEvent.click(screen.getByRole("button", { name: /유형 카테고리/i }));
  const filterOfTypes = screen
    .getAllByRole("button", { name: /클럽/i })
    .map((elem) => elem.textContent);

  await userEvent.click(screen.getByText(filterOfTypes[0] as string));
  // TODO: REFACTOR
  // - window.location.href에 저장되어있는게 아니라, 실제 쿼리 파라미터로 받는 작업 실행 해야함.

  expect(decodeURIComponent(decodeURIComponent(window.location.href))).toContain(filterOfTypes[0]);
  await userEvent.click(screen.getByRole("button", { name: /유형 카테고리/i }));
  await userEvent.click(screen.getByText(filterOfTypes[0] as string));
  expect(decodeURIComponent(decodeURIComponent(window.location.href))).not.toContain(
    filterOfTypes[0]
  );
});
