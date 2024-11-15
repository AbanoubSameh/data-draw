"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import * as vega from "vega";
import * as vegaTooltip from 'vega-tooltip';

export interface ChartPreviewProps {
    spec?: vega.Spec | undefined;
}

export default function ChartPreview({ spec }: ChartPreviewProps) {
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (spec && vegaContainerRef.current) {
            try {
                console.log(spec)
                var handler = new vegaTooltip.Handler();
                const runtime = vega.parse(spec);
                const view = new vega.View(runtime, { tooltip: handler.call })
                    .renderer("svg")
                    .initialize(vegaContainerRef.current)
                    .run();

                return () => {
                    view.finalize();
                };
            } catch (error) {
                console.log(error);
            }
        }
    }, [spec]);

    return (
        <Card className="flex-grow p-4 w-full h-full flex items-center justify-center">
            {spec ? (
                <div className="chart-container w-full h-full max-w-[600px]" ref={vegaContainerRef}></div>
            ) : (
                <span className="text-xs opacity-40 m-auto">
                    Upload File, and describe how you want to visualize the data
                </span>
            )}
        </Card>
    );
}
