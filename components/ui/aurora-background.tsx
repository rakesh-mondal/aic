"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-transparent",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Aurora Layer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              conic-gradient(from 230.29deg at 51.63% 52.16%, #ffaa40 0deg, #9c40ff 67.5deg, #ffaa40 198.75deg, #9c40ff 251.25deg, #ffaa40 301.88deg, #9c40ff 360deg),
              linear-gradient(180deg, #ffaa40 0%, #9c40ff 100%)
            `,
            animation: 'aurora-spin 20s linear infinite',
            filter: 'blur(40px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        
        {/* Secondary Aurora Layer */}
        <div
          className="absolute inset-0 opacity-18"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 120%, #9c40ff, transparent),
              radial-gradient(ellipse 60% 80% at 50% 40%, #ffaa40, transparent)
            `,
            animation: 'aurora-drift 30s ease-in-out infinite alternate',
            filter: 'blur(20px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />

        {/* Flowing gradient overlay */}
        <div
          className="absolute inset-0 opacity-24"
          style={{
            background: `
              linear-gradient(90deg, transparent, #ffaa40, transparent, #9c40ff, transparent),
              linear-gradient(45deg, #ffaa40, transparent, #9c40ff)
            `,
            backgroundSize: '200% 100%, 300% 200%',
            animation: 'aurora-flow 25s linear infinite, aurora-wave 15s ease-in-out infinite',
            filter: 'blur(15px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        
        {/* Top mask for focused effect */}
        {showRadialGradient && (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 60% at 50% 0%, transparent 30%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,1) 100%)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
};
