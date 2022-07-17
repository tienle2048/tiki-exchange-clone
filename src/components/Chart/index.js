import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./priceData";
//import { areaData } from './areaData';
import { volumeData } from "./volumeData";

import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'


import classNames from 'classnames/bind'
import styles from './Chart.module.scss'

const cx = classNames.bind(styles)


function Chart() {
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                backgroundColor: "#141828",
                textColor: "rgba(255, 255, 255, 0.9)"
            },
            grid: {
                vertLines: {
                    color: "#334158"
                },
                horzLines: {
                    color: "#334158"
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal
            },
            priceScale: {
                borderColor: "#485c7b"
            },
            timeScale: {
                borderColor: "#485c7b"
            }
        });

        console.log(chart.current);

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#2DC26D",
            downColor: "#FF424E",
            borderDownColor: "#FF424E",
            borderUpColor: "#2DC26D",
            wickDownColor: "#FF424E",
            wickUpColor: "#2DC26D"
        });

        candleSeries.setData(priceData);

        // const areaSeries = chart.current.addAreaSeries({
        //   topColor: 'rgba(38,198,218, 0.56)',
        //   bottomColor: 'rgba(38,198,218, 0.04)',
        //   lineColor: 'rgba(38,198,218, 1)',
        //   lineWidth: 2
        // });
        chart.current.subscribeCrosshairMove((param) => {
            if (!param.point) {
                return;
            }

            //console.log(param.seriesPrices.get(candleSeries));
        });

        // areaSeries.setData(areaData);

        const volumeSeries = chart.current.addHistogramSeries({
            upColor: "#86303E",
            downColor: "#FF424E",
            lineWidth: 2,
            priceFormat: {
                type: "volume"
            },
            overlay: true,
            scaleMargins: {
                top: 0.8,
                bottom: 0
            }
        });

        volumeSeries.setData(volumeData);
    }, []);

    
    // Resize chart on container resizes.
    useEffect(() => {
        resizeObserver.current = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            chart.current.applyOptions({ width, height });

            setTimeout(() => {
                chart.current.timeScale().fitContent();
            }, 0);
        });


        resizeObserver.current.observe(chartContainerRef.current);

        return () => resizeObserver.current.disconnect();
    }, []);

    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx("wrapper")}>
                <div className={cx("chart-header")}>
                    <div className={cx("chart-option")}>
                        <div className={cx("chart-option-item",'active')}>5m</div>
                        <div className={cx("chart-option-item")}>15m</div>
                        <div className={cx("chart-option-item")}>30m</div>
                        <div className={cx("chart-option-item")}>1h</div>
                        <div className={cx("chart-option-item")}>4h</div>
                        <div className={cx("chart-option-item")}>1D</div>
                        <div className={cx("chart-option-item")}>1W</div>
                    </div>
                </div>
                <div className={cx("chart-content")}>
                    <div ref={chartContainerRef} className={cx("chart-container")} />
                </div>
            </div>
        </>
    );
}

export default Chart;