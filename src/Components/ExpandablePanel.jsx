import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex flex-row justify-between items-center">
        <div className="flex p-2 flex-row gap-[30px] items-center cursor-pointer">
          {header}
        </div>
        <div
          className="mr-[20px] p-[5px] bg-yellow-300 rounded-full text-2xl cursor-pointer"
          onClick={handleExpand}
        >
          {expanded ? <GoChevronDown /> : <GoChevronRight />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
