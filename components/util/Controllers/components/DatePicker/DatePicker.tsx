import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactElement,
  forwardRef,
  useMemo,
  useState,
} from "react";
import styles from "./DatePicker.module.scss";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./../../../../../assets/calendar.svg";

import uk from "date-fns/locale/uk";

import Select from "react-select";

import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { useFilter } from "./../../../../../context/FilterContext";

const CustomOption = ({
  innerProps,
  isDisabled,
  children,
}: {
  innerProps: any;
  isDisabled: boolean;
  children: ReactElement | string | string[];
}) => {
  return !isDisabled ? (
    <div {...innerProps} className={styles.customOption}>
      {children}
    </div>
  ) : null;
};

// eslint-disable-next-line react/display-name
const CustomDatePickerInput = forwardRef(
  (
    {
      date,
      value,
      onClick,
      isSelected,
      ...props
    }: {
      date: { startDate: Date | null; endDate: Date | null };
      value?: any;
      onClick?: any;
      isSelected: boolean;
    },
    ref
  ) => {
    if (date.startDate) {
      if (!date.endDate || date.endDate.getTime() === date.startDate.getTime())
        value = value.split("-")[0];
    }
    return (
      <button
        className={
          styles.datePicker__input +
          " " +
          (isSelected ? styles.datePicker__input_active : "")
        }
        onClick={onClick}
        ref={ref as any}
        type="button"
      >
        <CalendarIcon />
        <input
          {...props}
          value={value}
          className={styles.datePicker__input_input}
        />
      </button>
    );
  }
);

const CustomDatePicker = () => {
  const { date, onChangeDate } = useFilter();

  const years = range(1991, getYear(new Date()) + 1, 1);
  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const startDateEndOfMonth = useMemo(() => {
    const lastDayOfMonth = new Date();
    return lastDayOfMonth;
  }, []);

  const [isSelected, setSelected] = useState(false);

  return (
    <DatePicker
      autoFocus={isSelected}
      onCalendarOpen={() => setSelected(true)}
      onCalendarClose={() => setSelected(false)}
      className={styles.datePicker}
      placeholderText="Оберіть проміжок часу"
      // maxDate={startDateEndOfMonth}
      locale={uk}
      customInput={
        <CustomDatePickerInput isSelected={isSelected} date={date} />
      }
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => {
        return (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={styles.datePicker__selectContainer}>
              <Select
                components={{ Option: CustomOption as any }}
                value={{
                  value: months[getMonth(date)],
                  label: months[getMonth(date)],
                }}
                onChange={(selectedOption) =>
                  changeMonth(
                    selectedOption?.value
                      ? months.indexOf(selectedOption.value)
                      : new Date().getMonth()
                  )
                }
                options={months.map((option) => ({
                  value: option,
                  label: option,
                }))}
                className={styles.datePicker__selectContainer_month}
              />
              <Select
                components={{ Option: CustomOption as any }}
                value={{
                  value: getYear(date),
                  label: getYear(date),
                }}
                onChange={(selectedOption) =>
                  changeYear(selectedOption?.value || new Date().getFullYear())
                }
                options={years.reverse().map((option) => ({
                  value: option,
                  label: option,
                }))}
                className={styles.datePicker__selectContainer_year}
              />
            </div>
            <div className={styles.controllers}>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className={
                  prevMonthButtonDisabled ? styles.controllers__disabled : ""
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6665 5.83331L7.49984 9.99998L11.6665 14.1666"
                    stroke="#309C54"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className={
                  nextMonthButtonDisabled ? styles.controllers__disabled : ""
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.3335 14.1667L12.5002 10L8.3335 5.83336"
                    stroke="#309C54"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      }}
      selected={date.startDate}
      selectsRange
      startDate={date.startDate}
      endDate={date.endDate}
      onChange={(date) =>
        onChangeDate({ startDate: date[0], endDate: date[1] })
      }
    />
  );
};

export default CustomDatePicker;
