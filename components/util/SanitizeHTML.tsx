import { FC, FunctionComponentFactory, ReactNode } from "react";
import sanitizeHtml from "sanitize-html";

const sanitize = (dirty: string, options: any) => ({
  __html: sanitizeHtml(dirty, options),
});

interface ISanitizeHTML {
  html: string;
  options?: any;
}

const SanitizeHTML: FC<ISanitizeHTML> = ({ html, options }) => {
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
};

export default SanitizeHTML;
