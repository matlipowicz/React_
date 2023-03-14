import style from "./Card.module.css";

export function GridUserWrapper({ children }: { children: React.ReactNode }) {
    return <div className={style.grid}>{children}</div>;
}
