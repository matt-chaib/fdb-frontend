import React from "react";

import { ScatterChartProps, DataPoint } from "../types/chartTypes";
import { useState, useEffect } from "react";
export const TransactionsChart: React.FC<ScatterChartProps> = ({
  width = 300,
  height = 200,
  data,
  title,
  incomes,
}) => {
  // Prevent errors if data is empty
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the max values for scaling
  const xMax = Math.max(...data.map((d) => d.x));
  const yMax = incomes.every(income => income.value <= 0) ? Math.min(...incomes.map(income => income.value)) : Math.max(...incomes.map(income => income.value));
  const padding = 40;
  const [paddingTop, setPaddingTop] = useState(40);
  const tickCount = 5; // Number of ticks on each axis
  const tickPadding = 5;
  const tickLabelPadding = 10;

  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) => (i * xMax) / tickCount);
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => (i * yMax) / tickCount);


  return (
    <div>
      <svg width={width} height={height} style={{ border: "1px solid black" }}>
      <text x={width / 2} y={paddingTop / 2} fontSize="14" textAnchor="middle">{title}</text>

  {incomes.map((income, index) => {
    return (
    <line 
      x1={(income.startDate / xMax) * (width - 2 * padding) + padding} 
      y1={height - (income.value / yMax) * (height - 2 * paddingTop) - padding} 
      x2={(income.endDate / xMax) * (width - 2 * padding) + padding} 
      y2={height - (income.value / yMax) * (height - 2 * paddingTop) - padding} 
      stroke="blue"   // Change color to blue
      strokeWidth={2} // Adjust thickness
    />
    )
  })}
  {/* <line x1={padding + } y1={padding / 2} x2={padding} y2={height - padding} stroke="black" /> */}


  {/* Draw Axes */}
  <line x1={padding} y1={height - padding} x2={width - padding / 2} y2={height - padding} stroke="black" />
  <line x1={padding} y1={paddingTop} x2={padding} y2={height - padding} stroke="black" />

  {/* X-axis ticks and labels */}
  {xTicks.map((tick, i) => {
    const xPos = (tick / xMax) * (width - 2 * padding) + padding;
    return (
      <g key={i}>
        <line x1={xPos} y1={height - padding} x2={xPos} y2={height - padding + tickPadding} stroke="black" />
        <text x={xPos} y={height - padding + (tickLabelPadding * 2)} fontSize="12" textAnchor="middle">
          {Math.round(tick)}
        </text>
      </g>
    );
  })}

  {/* Y-axis ticks and labels */}
  {yTicks.map((tick, i) => {
    const yPos = height - ((tick / yMax) * (height - 2 * paddingTop) + padding);
    return (
      <g key={i}>
        <line x1={padding - tickPadding} y1={yPos} x2={padding} y2={yPos} stroke="black" />
        <text x={padding - tickLabelPadding} y={yPos + 4} fontSize="12" textAnchor="end">
          {Math.round(tick)}
        </text>
      </g>
    );
  })}

  {/* Axis Labels */}
  <text x={width / 2} y={height - 5} fontSize="14" textAnchor="middle">
    {"X Axis"}
  </text>
  <text x={10} y={height / 2} fontSize="14" textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`}>
    {"Y Axis"}
  </text>
</svg>
    </div>
   
  );
};
