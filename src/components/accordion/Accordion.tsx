import { useState } from "react";
import "./index.css";

export interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [activeIndex, setActiveindex] = useState(null);

  const handleClick = (index) => {
    if (activeIndex === index) {
      // Hide current active content
      return setActiveindex(null);
    } else {
      return setActiveindex(index);
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isActiveIndex = index === activeIndex;
        return (
          <div key={`accordion-item-${index}`}>
            <div
              className={`accordion-title ${isActiveIndex ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {item.title}
            </div>
            {isActiveIndex && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
