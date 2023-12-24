import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Line from "./Line";
import { TimelineContext } from "../store/TimelineContext";

interface BeautifulTimelineProps {
  type?: "vertical" | "horizantol";
  cardClassName?: string;
  children?: string | JSX.Element | JSX.Element[];
  animation?: boolean;
  activeLineStyle?: CSSProperties;
  passiveLineStyle?: CSSProperties;
  animationDuration?: number;
}

const Timeline = ({
  type,
  children,
  animation = true,
  activeLineStyle,
  passiveLineStyle,
  animationDuration = 6000,
}: BeautifulTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [countOfTimelineEl, setCountOfTimelineEl] = useState(0);
  const timelineItemContents = document.getElementsByClassName(
    "beautiful-timeline-item-content-opposite",
  );

  useEffect(() => {
    const count = timelineRef.current ? timelineRef.current.children.length : 0;
    setCountOfTimelineEl(count);
  }, [timelineRef]);

  const maxHeightOfTimelineItemsContent = useMemo(() => {
    let maxHeight = 0;
    for (let i = 0; i < timelineItemContents.length; i++) {
      if (maxHeight < timelineItemContents[i].clientHeight) {
        maxHeight = timelineItemContents[i].clientHeight;
      }
    }

    return maxHeight;
  }, [timelineItemContents.length]);

  return (
    <TimelineContext.Provider
      value={{
        countOfTimelineEl,
        animationDuration,
        animation,
      }}
    >
      <div
        className="relative"
        style={{ paddingTop: `${maxHeightOfTimelineItemsContent}px` }}
      >
        <Line
          activeLineStyle={activeLineStyle}
          passiveLineStyle={passiveLineStyle}
          animation={animation}
          animationDuration={animationDuration}
        />

        <div ref={timelineRef} className="flex">
          <>{children}</>
        </div>
      </div>
    </TimelineContext.Provider>
  );
};

export default Timeline;
