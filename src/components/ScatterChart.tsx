import React from "react";

import { ScatterChartProps, DataPoint } from "../types/chartTypes";

export const ScatterChart: React.FC<ScatterChartProps> = ({
  width = 300,
  height = 200,
  data,
}) => {
  // Prevent errors if data is empty
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the max values for scaling
  const xMax = Math.max(...data.map((d) => d.x));
  const yMax = Math.max(...data.map((d) => d.y));
  const padding = 40;
  const tickCount = 5; // Number of ticks on each axis

  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) => (i * xMax) / tickCount);
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => (i * yMax) / tickCount);


  return (
    <svg width={width} height={height} style={{ border: "1px solid black" }}>
    {/* Draw Axes */}
    <line x1={padding} y1={height - padding} x2={width - padding / 2} y2={height - padding} stroke="black" />
    <line x1={padding} y1={padding / 2} x2={padding} y2={height - padding} stroke="black" />

    {/* X-axis ticks and labels */}
    {xTicks.map((tick, i) => {
      const xPos = (tick / xMax) * (width - 2 * padding) + padding;
      return (
        <g key={i}>
          <line x1={xPos} y1={height - padding} x2={xPos} y2={height - padding + 5} stroke="black" />
          <text x={xPos} y={height - padding + 20} fontSize="12" textAnchor="middle">
            {Math.round(tick)}
          </text>
        </g>
      );
    })}

    {/* Y-axis ticks and labels */}
    {yTicks.map((tick, i) => {
      const yPos = height - ((tick / yMax) * (height - 2 * padding) + padding);
      return (
        <g key={i}>
          <line x1={padding - 5} y1={yPos} x2={padding} y2={yPos} stroke="black" />
          <text x={padding - 10} y={yPos + 4} fontSize="12" textAnchor="end">
            {Math.round(tick)}
          </text>
        </g>
      );
    })}

    {/* Data Points */}
    {data.map((point, index) => (
      <circle
        key={index}
        cx={(point.x / xMax) * (width - 2 * padding) + padding}
        cy={height - (point.y / yMax) * (height - 2 * padding) - padding}
        r={5}
        fill="blue"
      />
    ))}

    {/* Axis Labels */}
    <text x={width / 2} y={height - 5} fontSize="14" textAnchor="middle">
      {"X Axis"}
    </text>
    <text x={10} y={height / 2} fontSize="14" textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`}>
      {"Y Axis"}
    </text>
  </svg>
  );
};
