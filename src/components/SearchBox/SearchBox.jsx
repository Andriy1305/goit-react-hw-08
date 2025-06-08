import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const debouncedDispatch = useMemo(
    () =>
      debounce((val) => {
        dispatch(changeFilter(val.trim()));
      }, 2000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel(); // очищаємо debounce при розмонтуванні
    };
  }, [debouncedDispatch]);

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedDispatch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={value}
      onChange={handleChange}
      className={styles.input}
    />
  );
};

export default SearchBox;
