import React, { useState } from 'react';
import * as dateFns from "date-fns";
import Head from 'next/head';

import Calender from '../components/calendar';
import FileUploader from '../components/file-uploader';

import styles from '../styles/Home.module.css'

export default function Home() {

  const [report, setReport] = useState([]);


  const buildCommitHistoryFromCSV = (CSV) => {
 
    const lines = CSV.split(/\r\n|\n/);
   
    const result = lines.reduce((acc, line) => {
      const entries = line.split('|');
      acc.push({ ad: entries[0], s: entries[1], an: entries[2] });
      return acc;
    }, []);

    setReport(result);
  
  };

  const handleDateClick = (date) => {
    console.log(date, report);

    const result  = report.filter(line => dateFns.isSameDay(new Date(line.ad), date));

    const workDone = result.reduce((acc, line) => {
      acc += `${line.s.trim()}; `;
      return acc;
    }, '');

    
    navigator.clipboard.writeText(workDone)
    .then(() => {
      const dayReport = `Report for ${date.toLocaleDateString()} \n Total number of commits ${result.length} \n ${workDone}`

      alert(dayReport);
    })
    .catch(e => {
      alert(e)
    })

   
  } 


  return (
    <div className={styles.container}>
      <Head>
        <title>Time tracker helper app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to time tracker helper app
        </h1>
        <p className={styles.description}>
          Visualize your github commits history
        </p>
        <FileUploader onFileLoaded={buildCommitHistoryFromCSV}/>
        <Calender onDateClick={handleDateClick} />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
