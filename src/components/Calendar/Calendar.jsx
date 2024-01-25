import React, { useState, useRef } from 'react';
import { getMonthData, areEqual } from "./js/calendar";
import classnames from 'classnames';

const Calendar = () => {
    const data = {
        date: new Date(),
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDay: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype
    }

    const [state, setState] = useState({
        date: data.date,
        currentDay: new Date(),
        selectedDate: null
    })

    const yearSelect = useRef(null);
    const monthSelect = useRef(null);

    const monthDate = getMonthData(state.date.getFullYear(), state.date.getMonth())

    const getYear = () => state.date.getFullYear();
    const getMonth = () => state.date.getMonth();
    const getDay = () => state.date.getDate();

    const handlePrevMonthBtn = () => {
        setState((prevState) => {
            const newDate = new Date(prevState.date);
            newDate.setMonth(prevState.date.getMonth() - 1);

            return {
                ...prevState,
                date: newDate,
            };
        });
    };

    const handleNextMonthBtn = (idx) => {
        setState((prevState) => {
            const newDate = new Date(prevState.date);
            newDate.setMonth(prevState.date.getMonth() + 1);

            return {
                ...prevState,
                date: newDate,
            };
        });
    };

    const handleChange = () => {
        const year = parseInt(yearSelect.current.value, 10);
        const month = data.months.indexOf(monthSelect.current.value);
        const date = new Date(year, month);

        setState({
            date,
            selectedMonth: data.months[month]
        });
    };

    const clickDay = (date) => {
        setState((prevState) => ({
            ...prevState,
            selectedDate: areEqual(date, prevState.selectedDate) ? null : date
        }));
        console.log(date)

    };
    return (
        <div className='cal'>
            <div className="cal__row">
                <button onClick={handlePrevMonthBtn} className="cal__btn">{'<'}</button>
                <select
                    ref={yearSelect}
                    onChange={handleChange}
                    className="cal__select"
                    defaultValue={getYear()}
                >
                    {data.years.map((item, idx) => (
                        <option className='cal__option' value={item} key={idx}>{item}</option>
                    ))}
                </select>

                <select
                    ref={monthSelect}
                    onChange={handleChange}
                    className="cal__select"
                    value={state.selectedMonth}
                >
                    {data.months.map((item, idx) => (
                        <option className='cal__option' value={item} key={idx}>{item}</option>
                    ))}
                </select>


                <button onClick={handleNextMonthBtn} className="cal__btn">{'>'}</button>
            </div>

            <table className="cal__table">
                <thead className='cal__thead'>
                <tr className='cal__tr'>
                    {data.weekDay.map((item, idx) => (
                        <th className='cal__th' key={item.id || idx}>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody className='cal__tbody'>
                {monthDate.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((date, dayIndex) => date ? (
                            <td
                                className={classnames('cal__day', {
                                    'cal__today': areEqual(date, state.currentDay),
                                    'cal__selected': areEqual(date, state.selectedDate)
                                })}
                                key={dayIndex}
                                onClick={() => clickDay(date)}
                            >
                                {date.getDate()}
                            </td>
                        ) : (
                            <td key={dayIndex}></td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;