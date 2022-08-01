import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
//import { priceData } from "./priceData";
//import { volumeData } from "./volumeData";

import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'


import classNames from 'classnames/bind'
import styles from './Chart.module.scss'

import { getDateChart } from "../../services/ChartServices";

const cx = classNames.bind(styles)


function Chart() {

    const webSocket = useRef(null);
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();
    const [priceData, setpriceData] = useState([])
    const [volumeData, setvolumeData] = useState([])
    const [detailData, setdetailData] = useState([])


    useEffect(() => {
        getDateChart.period5m()
            .then((respones) => {
                //console.log(respones.data)
                let price = respones.data.map(x => {
                    return {
                        time: parseInt(x[0]),
                        open: parseInt(x[1]),
                        high: parseInt(x[2]),
                        low: parseInt(x[3]),
                        close: parseInt(x[4])
                    }
                })

                let volume = respones.data.map(x => {
                    return {
                        time: parseInt(x[0]),
                        value: parseInt(x[5]),
                        color: parseInt(x[4]) - parseInt(x[1]) >= 0 ? '#2DC26D' : '#FF424E'
                    }
                })
                setpriceData(price)
                setvolumeData(volume)
            })


    }, [])

    useEffect(() => {
        console.log('Opening WebSocket');
        webSocket.current = new WebSocket('wss://exchange-stream.tiki.vn/?stream=asaxu.kline-5m');
        const openWebSocket = () => {
            webSocket.current.onopen = (event) => {
                console.log('Open:', event);
            }
        }
        openWebSocket();
        return () => {
            console.log('Closing WebSocket');
            webSocket.current.close();
        }
    }, []);

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

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#2DC26D",
            downColor: "#FF424E",
            borderDownColor: "#FF424E",
            borderUpColor: "#2DC26D",
            wickDownColor: "#FF424E",
            wickUpColor: "#2DC26D"
        });

        candleSeries.setData(priceData);



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


        chart.current.subscribeCrosshairMove((param) => {
            if (!param.point) {
                return;
            }
            if (param.seriesPrices.get(candleSeries)) {
                let { close, high, low, open } = param.seriesPrices.get(candleSeries)
                //console.log(close)
                let volume = param.seriesPrices.get(volumeSeries)
                let time = param.time
                if ([time, open, close, high, low, volume] !== detailData) setdetailData([time, open, close, high, low, volume])
            }
            /* console.log(
                param.seriesPrices.get(candleSeries),
                param.seriesPrices.get(volumeSeries),
                param.time
            ); */
        });

        webSocket.current.onmessage = (event) => {
            let data = JSON.parse(event.data)['asaxu.kline-5m']
            let currentBar = {
                time: parseInt(data[0]),
                open: parseInt(data[1]),
                high: parseInt(data[2]),
                low: parseInt(data[3]),
                close: parseInt(data[4])
            };
            let currentVolume = {
                time: parseInt(data[0]),
                value: parseInt(data[5]),
                color: parseInt(data[4]) - parseInt(data[1]) >= 0 ? '#2DC26D' : '#FF424E'
            }
            candleSeries.update(currentBar)
            volumeSeries.update(currentVolume)
            //console.log(currentBar)
        }

        return () => {
            chart.current.remove()
        }


    }, [priceData, volumeData]);


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




    const handlechart = () => {
        getDateChart.period5m()
        /* 
        getDateChart.period15m()
        getDateChart.period30m()
        getDateChart.period1h()
        getDateChart.period4h()
        getDateChart.period1d()
        getDateChart.period1w() */
    }

    //console.log('re-render chart')

    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx("wrapper")}>
                <div className={cx("chart-header")}>
                    <div className={cx("chart-option")}>
                        <div className={cx("chart-option-item", 'active')} onClick={handlechart}>5m</div>
                        <div className={cx("chart-option-item")}>15m</div>
                        <div className={cx("chart-option-item")}>30m</div>
                        <div className={cx("chart-option-item")}>1h</div>
                        <div className={cx("chart-option-item")}>4h</div>
                        <div className={cx("chart-option-item")}>1D</div>
                        <div className={cx("chart-option-item")}>1W</div>
                    </div>
                </div>
                <div className={cx("chart-content")}>
                    <div className={cx("info")}>
                        <div>{detailData[0]}</div>
                        <div>mở {detailData[1]}</div>
                        <div>Đóng {detailData[2]}</div>
                        <div>Cao {detailData[3]}</div>
                        <div>Thấp {detailData[4]}</div>
                        <div>Khối lượng {detailData[5]}</div>
                    </div>
                    <div ref={chartContainerRef} className={cx("chart-container")} />
                </div>
            </div>
        </>
    );
}

export default Chart;