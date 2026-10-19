// base の末尾にスラッシュが付くかは設定次第なので、ここでそろえてからつなぐ
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function withBase(path: string) {
  return `${BASE}${path.replace(/^\//, '')}`;
}
