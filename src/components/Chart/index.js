import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

import handle from '../../assets/svg/arrows-up-down-left-right-solid.svg'

import classNames from 'classnames/bind'
import styles from './Chart.module.scss'

import { getDateChart } from "../../services/ChartServices";

const cx = classNames.bind(styles)



function InfoCandle({ dataInfo }) {

    //console.log('re-render infocandle')
    const [data, setData] = useState([])
    useEffect(() => {
        dataInfo(setData)
    }, [dataInfo, data])

    const date = new Date(data[0] * 1000)
    const color = data[2] - data[1] >= 0 ? "green" : "red"

    return (
        <div className={cx("info")}>
            <div className={cx(color)}>{`${date.getDay()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`}</div>
            <div>mở <div className={cx(color)}>{data[1]}</div></div>
            <div>Đóng <div className={cx(color)}>{data[2]}</div></div>
            <div>Cao <div className={cx(color)}>{data[3]}</div></div>
            <div>Thấp <div className={cx(color)}>{data[4]}</div></div>
            <div>Khối lượng <div className={cx(color)}>{data[5]}</div></div>
        </div>
    );
}



function Chart() {

    const webSocket = useRef(null);
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    const CANDLE_SETTING = {
        upColor: "#2DC26D",
        downColor: "#FF424E",
        borderDownColor: "#FF424E",
        borderUpColor: "#2DC26D",
        wickDownColor: "#FF424E",
        wickUpColor: "#2DC26D"
    }
    const VOLUME_SETTING = {
        priceFormat: {
            type: "volume"
        },
        overlay: true,
        scaleMargins: {
            top: 0.93,
            bottom: 0
        }
    }


    const [priceData, setpriceData] = useState([])


    const [active, setActive] = useState('5m')


    const PreDetailData = useRef([])
    let setDataFromChild = null

    const childData = (dataFromChild) => {
        setDataFromChild = dataFromChild
    }

    useEffect(() => {
        Promise.all([
            getDateChart.period5m(),
            getDateChart.period15m(),
            getDateChart.period30m(),
            getDateChart.period1h(),
            getDateChart.period4h(),
            getDateChart.period1d(),
            getDateChart.period1w()
        ])
            .then((responses) => {
                return Promise.all(responses.map((response) => {
                    let price = response.data.map(x => {
                        return {
                            time: parseInt(x[0]),
                            open: parseInt(x[1]),
                            high: parseInt(x[2]),
                            low: parseInt(x[3]),
                            close: parseInt(x[4])
                        }
                    })

                    let volume = response.data.map(x => {
                        return {
                            time: parseInt(x[0]),
                            value: parseInt(x[5]),
                            color: parseInt(x[4]) - parseInt(x[1]) >= 0 ? '#2DC26D' : '#FF424E'
                        }
                    })
                    return { price, volume }
                }));
            })
            .then((data) => {
                console.log(data)
                setpriceData({
                    '5m': data[0],
                    '15m': data[1],
                    '30m': data[2],
                    '1h': data[3],
                    '4h': data[4],
                    '1d': data[5],
                    '1w': data[6]
                })
            })

    }, [])

    useEffect(() => {
        console.log('Opening WebSocket');
        webSocket.current = new WebSocket('wss://exchange-stream.tiki.vn/?stream=asaxu.kline-5m&stream=asaxu.kline-15m&stream=asaxu.kline-30m&stream=asaxu.kline-1h&stream=asaxu.kline-4h&stream=asaxu.kline-1d&stream=asaxu.kline-1w');
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
        const candleSeries = chart.current.addCandlestickSeries(CANDLE_SETTING);
        if (priceData[active]) candleSeries.setData(priceData[active].price)
        const volumeSeries = chart.current.addHistogramSeries(VOLUME_SETTING);
        if (priceData[active]) volumeSeries.setData(priceData[active].volume);


        chart.current.subscribeCrosshairMove((param) => {
            if (!param.point) {
                return;
            }
            if (param.seriesPrices.get(candleSeries)) {
                let { close, high, low, open } = param.seriesPrices.get(candleSeries)
                let volume = param.seriesPrices.get(volumeSeries)
                let time = param.time
                if (JSON.stringify([time, open, close, high, low, volume]) !== JSON.stringify(PreDetailData.current)) {
                    PreDetailData.current = [time, open, close, high, low, volume]

                    setDataFromChild([time, open, close, high, low, volume])
                }
            }
        });

        webSocket.current.onmessage = (event) => {
            let data = JSON.parse(event.data)[`asaxu.kline-${active}`]
            if (data) {
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
            }
            //console.log(currentBar)
        }

        return () => {
            chart.current.remove()
        }


    }, [active, priceData]);


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


    console.log('re-render chart', priceData)



    return (
        <>
            <span className='drag-handle'>
                <img src={handle} alt='handle'></img>
            </span>
            <div className={cx("wrapper")}>
                <div className={cx("chart-header")}>
                    <div className={cx("chart-option")}>
                        <div className={cx("chart-option-item", { 'active': active === '5m' })} onClick={() => setActive('5m')}>5m</div>
                        <div className={cx("chart-option-item", { 'active': active === '15m' })} onClick={() => setActive('15m')}>15m</div>
                        <div className={cx("chart-option-item", { 'active': active === '30m' })} onClick={() => setActive('30m')}>30m</div>
                        <div className={cx("chart-option-item", { 'active': active === '1h' })} onClick={() => setActive('1h')}>1h</div>
                        <div className={cx("chart-option-item", { 'active': active === '4h' })} onClick={() => setActive('4h')}>4h</div>
                        <div className={cx("chart-option-item", { 'active': active === '1d' })} onClick={() => setActive('1d')}>1D</div>
                        <div className={cx("chart-option-item", { 'active': active === '1w' })} onClick={() => setActive('1w')}>1W</div>
                    </div>
                </div>
                <div className={cx("chart-content")}>
                    <InfoCandle dataInfo={childData} />
                    <div ref={chartContainerRef} className={cx("chart-container")} />
                </div>
            </div>
        </>
    );
}

export default Chart;