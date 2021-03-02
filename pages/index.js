import React, { useState } from 'react';
import * as dateFns from "date-fns";
import Head from 'next/head';

import Calender from '../components/calendar';
import FileUploader from '../components/file-uploader';
import Code from '../components/code';

import styles from '../styles/Home.module.css'

export default function Home() {

  const [report, setReport] = useState([]);
  const [authorsSelectorOptions, setAuthorsSelectorOptions] = useState([]);
  const [authorsSelectorVal, setAuthorsSelectorVal] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleCSVLoaded = (CSV, name) => {
    const report = buildCommitHistoryFromCSV(CSV);
    const authors = getDistinctAns(report);
    setReport(report);
    setAuthorsSelectorOptions(authors);
    setAuthorsSelectorVal(authors[0]);
    setFileName(name);
  }


  const buildCommitHistoryFromCSV = (CSV) => {

    const lines = CSV.split(/\r\n|\n/);

    const result = lines.reduce((acc, line) => {
      const entries = line.split('|');
      acc.push({ ad: entries[0], s: entries[1], an: entries[2] });
      return acc;
    }, []);

    return result;

  };


  const getDistinctAns = (report) => {
    return report.reduce((acc, item) => {
      if (acc.indexOf(item.an) === -1) {
        acc.push(item.an);
      }
      return acc;
    }, [])
  }

  const handleDateClick = (date) => {
    console.log(date, report);

    const result = report.filter(line => dateFns.isSameDay(new Date(line.ad), date) && line.an === authorsSelectorVal);

    const workDone = result.reduce((acc, line) => {
      acc += `${line.s.trim()}; `;
      return acc;
    }, '');


    navigator.clipboard.writeText(workDone)
      .then(() => {
        const dayReport = `Report for ${date.toLocaleDateString()} \n Total number of commits ${result.length} \n ${workDone}`

        alert('Copied!');
        // alert(dayReport);
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
        <Code
          label='Produce report'
          className={styles.code}
          code={`git log --format='%ad | %s | %an' --sparse --full-history --no-merges --date=short > report.csv`}
        />
        <div className={styles.loader}>
          <p>Upload commit history CSV</p>
          <FileUploader onFileLoaded={handleCSVLoaded} />
          <span className={styles.filename}>{fileName}</span>
        </div>
        <div className={styles.authors}>
          <p>Select author</p>
          <select value={authorsSelectorVal} onChange={e => setAuthorsSelectorVal(e.target.value)}>
            {
              authorsSelectorOptions.map(o => (<option value={o}>{o}</option>))
            }
          </select>
        </div>
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
