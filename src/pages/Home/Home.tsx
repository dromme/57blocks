import { Tabs } from "@/components";
import styles from './Home.module.scss';
import { Navigate, Outlet } from "react-router-dom";
import { STATE_KEYS, useLocalStorage } from "@/utils/LocalStorage";

const HOME_TABS = [{ label: 'Home', route: '/' }, { label: 'Favs', route: '/favorites' }];

const Home = () => {
  const [username] = useLocalStorage(STATE_KEYS.USERNAME);

  if (!username) {
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Explore</h1>
      <Tabs
        tabs={HOME_TABS} />
      <Outlet />
    </div>
  )
}

export default Home;