import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const SubmissionHeatmap = ({ data }) => {
  return (
    <div className="scale-90 md:scale-80">
      <CalendarHeatmap
        startDate={new Date(new Date().setDate(new Date().getDate() - 89))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count >= 5) return 'color-scale-4';
          if (value.count >= 3) return 'color-scale-3';
          if (value.count >= 1) return 'color-scale-2';
          return 'color-empty';
        }}
        tooltipDataAttrs={(value) => ({
          'data-tip': `${value.date}: ${value.count} submission${value.count > 1 ? 's' : ''}`,
        })}
        showWeekdayLabels
      />
      <ReactTooltip id="heatmap-tooltip" />
    </div>
  );
};

export default SubmissionHeatmap;
