"use client";

import Link from "next/link";

import styles from "./sidenav.module.css";
import { usePathname } from "next/navigation";

export default function DashboardSideNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link
        href="/dashboard"
        className={`${styles.navbar_items} ${
          pathname === "/dashboard" ? styles.navbar_items_active : ""
        }`}
      >
        Dashboard
      </Link>
    </nav>
  );
}
