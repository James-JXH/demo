"use client"; // This is a client component 👈🏽
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import Image from "next/image";
import styles from "./page.module.css";
// Initialize exporting module.
Exporting(Highcharts);


const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
  gap: 16px;
  width: 200px;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 80px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMy0wNCAxNzowOTo0NSIsInVzZXJfaWQiOiJqYW1lc2ppIiwiaXAiOiIxNjUuMTU0LjczLjIzMyJ9.lfQR7-ibt9UEGPrmBKnlGBpCLcIvVAUavofj7slpfmM';

export default function Home({ posts }) {
  console.log(posts, "data"); 
  const [list, setList] = useState();

  useEffect(() => {

    fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      if (data?.status === 200) {
        setList(data?.data);
      } else {
        setList([]);
      }
    });
      //console.log('res---', res);
      //setList(res?.data);

    console.log('res', list);
    // Generate the chart

    Highcharts?.chart('container', {
      // options - see https://api.highcharts.com/highcharts
      chart: {
          zoomType: 'xy'
      },
      title: {
          text: 'Karasjok weather, 2021',
          align: 'left'
      },
      subtitle: {
          text: 'Source: ' +
              '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
              'target="_blank">YR</a>',
          align: 'left'
      },
      xAxis: [{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: 'Precipitation',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value} mm',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      tooltip: {
          shared: true
      },
      legend: {
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 60,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || // theme
              'rgba(255,255,255,0.25)'
      },
      series: [{
          name: 'Precipitation',
          type: 'column',
          yAxis: 1,
          data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
              60.0, 28.6, 32.1],
          tooltip: {
              valueSuffix: ' mm'
          }
  
      }, {
          name: 'Temperature',
          type: 'spline',
          data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8,
              -0.7, -11.0, -16.4],
          tooltip: {
              valueSuffix: '°C'
          }
      }]
    });

  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Tabs defaultValue={2} orientation="vertical">
          <TabsList>
            <Tab>最新動態</Tab>
            <Tab>財務報表</Tab>
            <Tab>獲利能力</Tab>
            <Tab>安全性分析</Tab>
            <Tab>成長力分析</Tab>
            <Tab>價值評估</Tab>
            <Tab>董監與籌碼</Tab>
            <Tab>關鍵指標</Tab>
            <Tab>產品組合</Tab>
          </TabsList>
          <TabPanel value={2}>
            <Tabs defaultValue={'2-1'} orientation="vertical">
              <TabsList>
                <Tab>每月營收</Tab>
                <Tab>每股盈餘</Tab>
                <Tab>每股淨值</Tab>
                <Tab>損益表</Tab>
                <Tab>總資產</Tab>
                <Tab>負債和股東權益</Tab>
                <Tab>現金流量表</Tab>
                <Tab>股利政策</Tab>
                <Tab>電子書</Tab>
              </TabsList>
            </Tabs>
          </TabPanel>
        </Tabs>
        <div id="container"></div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}


/*
Home.getInitialProps = async () => {
  let pageProps = {};

  try {
    let data = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&token=${token}`);
    pageProps["data"] = data;
  } catch (error) {}

  return { pageProps };
};*/


/*export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&token=${token}`)
  const posts = await res.json()
console.log('res',res);
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}*/
