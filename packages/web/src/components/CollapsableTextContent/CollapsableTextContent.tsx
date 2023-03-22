import { useState } from "react";
import { StyledCollapsableTextContent } from "./styles";
import ArrowIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export type CollapsableTextContentProps = {
  title: string;
  children: string;
};

export const CollapsableTextContent = ({ title, children }: CollapsableTextContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledCollapsableTextContent isOpen={isOpen}>
      <div className="title-container" onClick={() => setIsOpen((prev) => !prev)}>
        <ArrowIcon className="arrow" />
        <p>{title}</p>
      </div>

      <div className="content-container">{children}</div>
    </StyledCollapsableTextContent>
  );
};
