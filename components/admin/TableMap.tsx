"use client";

import React, { useState } from "react";

// Dimensiones de la barra: 150cm x 50cm
// Escala: 1cm = 2px -> 300px x 100px
const BAR_WIDTH = 300;
const BAR_HEIGHT = 100;
const COLUMN_SIZE = 60; // 30cm aprox

export function TableMap() {
  const [activeSpace, setActiveSpace] = useState("SALA_1");

  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-lg">
          {["SALA_1", "SALA_2", "SALA_3"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpace(s)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeSpace === s
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-zinc-100 border border-zinc-400 dark:bg-zinc-800 dark:border-zinc-600" />
            <span className="text-[10px] text-zinc-500 font-medium">Libre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-zinc-900 dark:bg-zinc-100" />
            <span className="text-[10px] text-zinc-500 font-medium">Ocupado</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {/* SVG del Mapa */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 450"
          className="touch-none select-none"
        >
          {/* Definiciones de Sombras y Gradientes */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* SALA 1 - Representación real */}
          {activeSpace === "SALA_1" && (
            <g>
              {/* Columna Izquierda */}
              <rect
                x={200}
                y={150}
                width={COLUMN_SIZE}
                height={COLUMN_SIZE}
                fill="currentColor"
                className="text-zinc-300 dark:text-zinc-700"
                rx={4}
              />
              
              {/* LA BARRA (150x50 cm) */}
              <g className="cursor-pointer group" filter="url(#shadow)">
                <rect
                  x={200 + COLUMN_SIZE}
                  y={150 + 10}
                  width={BAR_WIDTH}
                  height={BAR_HEIGHT - 20}
                  fill="currentColor"
                  className="text-zinc-50 dark:text-zinc-800 stroke-zinc-300 dark:stroke-zinc-700 stroke-2 transition-colors group-hover:stroke-zinc-900 dark:group-hover:stroke-zinc-100"
                  rx={12}
                />
                
                {/* Asientos representados como puntos (6 personas) */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle
                    key={i}
                    cx={200 + COLUMN_SIZE + 40 + i * 44}
                    cy={150 + BAR_HEIGHT - 10}
                    r={6}
                    className="fill-zinc-200 dark:fill-zinc-700"
                  />
                ))}

                <text
                  x={200 + COLUMN_SIZE + BAR_WIDTH / 2}
                  y={150 + BAR_HEIGHT / 2 - 2}
                  textAnchor="middle"
                  className="fill-zinc-900 dark:fill-zinc-100 text-[11px] font-bold tracking-tight"
                >
                  BARRA ENTRE COLUMNAS
                </text>
                <text
                  x={200 + COLUMN_SIZE + BAR_WIDTH / 2}
                  y={150 + BAR_HEIGHT / 2 + 12}
                  textAnchor="middle"
                  className="fill-zinc-400 text-[9px] font-medium"
                >
                  150 x 50 cm
                </text>
              </g>

              {/* Columna Derecha */}
              <rect
                x={200 + COLUMN_SIZE + BAR_WIDTH}
                y={150}
                width={COLUMN_SIZE}
                height={COLUMN_SIZE}
                fill="currentColor"
                className="text-zinc-300 dark:text-zinc-700"
                rx={4}
              />

              {/* Barra de Cócteles (Decorativa / Fija) */}
              <g>
                <rect
                  x={150}
                  y={50}
                  width={500}
                  height={40}
                  fill="none"
                  strokeDasharray="6 4"
                  className="stroke-zinc-200 dark:stroke-zinc-800"
                  rx={20}
                />
                <text
                  x={400}
                  y={75}
                  textAnchor="middle"
                  className="fill-zinc-300 dark:fill-zinc-700 text-[10px] font-medium tracking-widest uppercase"
                >
                  — BARRA DE CÓCTELES (FIJA) —
                </text>
              </g>
            </g>
          )}

          {activeSpace !== "SALA_1" && (
            <text x="50%" y="50%" textAnchor="middle" className="fill-zinc-400 text-sm italic">
              Configurando mapa para {activeSpace}...
            </text>
          )}
        </svg>

        {/* Overlay informativo de "Pellizcar para Zoom" (Solo UI) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>
          <span className="text-[10px] text-zinc-500 font-medium tracking-wide">Pinch to zoom / Drag to move</span>
        </div>
      </div>
    </div>
  );
}
