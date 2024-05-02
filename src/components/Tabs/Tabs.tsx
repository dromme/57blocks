import { NavLink } from 'react-router-dom';
import styles from './Tabs.module.scss';

interface TabsProps {
  tabs: { label: string, route: string }[];
}
const Tabs = ({ tabs = [] }: TabsProps) => {

  return (
    <nav id="sidebar" className={styles.navList}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.route}
          to={tab.route}
          className={({ isActive, isTransitioning }) => `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {tab.label}
        </NavLink>
      )
      )}
    </nav >

  );
}

export default Tabs;
