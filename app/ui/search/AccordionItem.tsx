

import { useEffect, useRef, useState } from "react";
import { AccordionData } from "../types";
import './css/AccordionItem.css';

function AccordionItem({ 
    data,
    isOpen,
    btnOnClick,
 }: { 
    data: AccordionData;
    isOpen: boolean; 
    btnOnClick: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) {
          const contentEl = contentRef.current as HTMLDivElement;
    
          setHeight(contentEl.scrollHeight);
        } else {
          setHeight(0);
        }
      }, [isOpen]);

    return (
        <li className="accordion-item">
            <h2 className="accordion-item-title">
                <button className="accordion-item-btn" onClick={btnOnClick}>
                    {data.title}
                </button>
            </h2>
            <div className="accordion-item-container" style={{ height }}>
                <div ref={contentRef} className="accordion-item-content">
                    {data.content}
                </div>
            </div>
        </li>
    );
}

export default AccordionItem;