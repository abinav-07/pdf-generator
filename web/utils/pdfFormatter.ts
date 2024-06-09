import { rehype } from "rehype";
import rehypeFormat from "rehype-format";

export const formatHtml = (input: string) => {
  return String(rehype().use(rehypeFormat).processSync(input));
};
