import React from "react";

import { ScatterChartProps, DataPoint } from "../types/chartTypes";
import { useState, useEffect } from "react";
export const ScatterChart: React.FC<ScatterChartProps> = ({
  width = 300,
  height = 200,
  title = "",
  data,
  incomes,
}) => {
  if (data.length === 0) return <p>No data available</p>;

  const padding = 60;
  const [paddingTop, setPaddingTop] = useState(50);
  const tickCount = 5;
  const tickPadding = 5;
  const tickLabelPadding = 10;

  // 🔹 Determine min/max Y values for scaling (handle negative values)
  const yMin = Math.min(...data.map((d) => d.y));
  const yMax = Math.max(...data.map((d) => d.y));
  const xMax = Math.max(...data.map((d) => d.x));

  // 🔹 Create Y-ticks spanning negative and positive range
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => yMin + (i * (yMax - yMin)) / tickCount);
  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) => (i * xMax) / tickCount);

  useEffect(() => {
    if (incomes && incomes.length) {
      // setPaddingTop(Math.max(30 * incomes.length, 100));
    }
  }, [incomes]);

  return (
    <div>
      <h2>{title}</h2>
      <svg width={width} height={height} style={{ border: "1px solid black" }}>
        {/* X-Axis */}
        <line x1={padding} y1={height - padding} x2={width - padding / 2} y2={height - padding} stroke="black" />
        
        {/* Y-Axis */}
        <line x1={padding} y1={paddingTop} x2={padding} y2={height - padding} stroke="black" />

        {/* X-axis ticks and labels */}
        {xTicks.map((tick, i) => {
          const xPos = (tick / xMax) * (width - 2 * padding) + padding;
          return (
            <g key={i}>
              <line x1={xPos} y1={height - padding} x2={xPos} y2={height - padding + tickPadding} stroke="black" />
              <text x={xPos} y={height - padding + tickLabelPadding * 2} fontSize="12" textAnchor="middle">
                {Math.round(tick)}
              </text>
            </g>
          );
        })}

        {/* Y-axis ticks and labels */}
        {yTicks.map((tick, i) => {
          // 🔹 Adjust y-position to map negative values correctly
          const yPos = height - ((tick - yMin) / (yMax - yMin)) * (height - 2 * paddingTop) - padding;
          return (
            <g key={i}>
              <line x1={padding - tickPadding} y1={yPos} x2={padding} y2={yPos} stroke="black" />
              <text x={padding - tickLabelPadding} y={yPos + 4} fontSize="12" textAnchor="end">
                {Math.round(tick)}
              </text>
            </g>
          );
        })}

        {/* Data Points */}
        {data.map((point, index) => {
          const xPos = (point.x / xMax) * (width - 2 * padding) + padding;
          const yPos = height - ((point.y - yMin) / (yMax - yMin)) * (height - 2 * paddingTop) - padding; // 🔹 Updated for negative Y-values
          return <circle key={index} cx={xPos} cy={yPos} r={5} fill="blue" />;
        })}

        {/* Axis Labels */}
        <text x={width / 2} y={height - 5} fontSize="14" textAnchor="middle">X Axis</text>
        <text x={10} y={height / 2} fontSize="14" textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`}>
          Y Axis
        </text>
      </svg>
    </div>
  );
};
