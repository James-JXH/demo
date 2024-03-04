"use client"; // This is a client component 👈🏽
import { useEffect } from 'react';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import Image from "next/image";
import styles from "./page.module.css";
// Initialize exporting module.
Exporting(Highcharts);

export default function Home() {

  useEffect(() => {

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
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <Tabs defaultValue={0} orientation="vertical">
          <TabsList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabsList>
          <TabPanel value={0}>First page</TabPanel>
          <TabPanel value={1}>Second page</TabPanel>
          <TabPanel value={2}>Third page</TabPanel>
        </Tabs>
        <div id="container"></div>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
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
