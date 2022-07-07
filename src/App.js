import './App.css';
import "react-resizable/css/styles.css";

import { CategoryHeader, Chart, Header, OrderBook, OrderForm, Orders, Trades } from './components'

import { Responsive, WidthProvider } from "react-grid-layout";



function App() {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  let layouts = [
    { i: "header", x: 0, y: 0, w: 12, h: 1 ,static: true },
    { i: "category", x: 2, y: 0, w: 8, h: 1 },
    { i: "chart", x: 2, y: 0, w: 8, h: 9 },
    { i: "book", x: 0, y: 0, w: 2, h: 14 },
    { i: "orders", x: 10, y: 10, w: 12, h: 4 },
    { i: "form", x: 2, y: 0, w: 8, h: 4 },
    { i: "trader", x: 12, y: 0, w: 2, h: 14 }
  ];

  const DefaultProps={
    className:"layout",
      layouts:{ lg: layouts ,md:layouts},
      breakpoints:{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      cols:{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 },
      rowHeight:56,
      margin:[0,0],
      isResizable:true
  }


  return (
    <ResponsiveGridLayout {...DefaultProps}
    >
      <div key='header' className='okla1'><Header/></div>
      <div key='category' className='okla2'><CategoryHeader/></div>
      <div key='chart' className='okla3'><Chart/></div>
      <div key='book' className='okla4'><OrderBook/></div>
      <div key='orders' className='okla5'><Orders/></div>
      <div key='form' className='okla6'><OrderForm/></div>
      <div key='trader' className='okla6'><Trades/></div>
    </ResponsiveGridLayout>
  )
}
export default App;
