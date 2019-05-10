import _ from "lodash";
export function Paginate(movies, current, size) {
  const startIndex = (current - 1) * size;
  const mos = _(movies)
    .slice(startIndex)
    .take(size)
    .value();

  return mos;
}
