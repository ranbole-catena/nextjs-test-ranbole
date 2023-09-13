import Link from "next/link";
import parse, { domToReact } from "html-react-parser";

export function parseContent(html) {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.name === "h2") {
        return (
          <h2 className={`${H2Style} mb-3 border-b-2 pb-3`}>
            {domToReact(domNode.children)}
          </h2>
        );
      }
      if (domNode.name === "a") {
        return (
          <Link href={`/${domNode.attribs.href}`} className={`${LinkStyle}3`}>
            {domToReact(domNode.children)}
          </Link>
        );
      }
    },
  });
}
