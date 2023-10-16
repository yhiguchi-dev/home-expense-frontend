import { ReactElement } from "react";

import styles from "./page.module.css";

const RootPage = (): ReactElement => {
  return (
    <main className={styles.main}>
      <div className={styles.description}></div>
    </main>
  );
};

export default RootPage;
