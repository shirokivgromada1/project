import { FC } from "react";
import Filter from "./components/Filter/Filter";
import styles from "./Controllers.module.scss";
import {
  DepartmentPeopleComponentsControllers,
  PageComponentsControllers,
} from "@/tina/__generated__/types";

interface IControllers {
  className?: string;
  data: PageComponentsControllers | DepartmentPeopleComponentsControllers;
}

export const Controllers: FC<IControllers> = ({ className, data }) => {
  const { controllers_headline, hasCalendar, hasSearch, hasCategory } = data;

  return (
    <section className={styles.controllers}>
      <div className="container">
        <h1>{controllers_headline}</h1>
        <Filter
          className={className}
          hasCalendar={hasCalendar}
          hasSearch={hasSearch}
          hasCategory={hasCategory}
        />
      </div>
    </section>
  );
};
