import React, { useEffect, useState } from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi"
export default function NiceDatePicker(props) {

  const {
    formik,
    label,
    format,
    size,
    inputVariant,
    invalidLabel,
    invalidDateMessage,
    field,
    disabled,
    isCollapse,
    collapseNode,
    collapseIndex,
    disableFuture,
    minDate,
    minDateMessage,
    maxDate,
    maxDateMessage,
    allowKeyboardControl,
  } = props

  const [selectedDate, setSelectedDate] = useState(formik.values[field]);
  const obj = formik.values[collapseNode];
  const handleChange = (date) => {
    if (isCollapse == true) {

      if (obj == null) {
        obj = []
      }
      if (collapseIndex != null) {
        obj[collapseIndex][field] = date;
      } else {
        obj[field] = date;
      }

    }
    setSelectedDate(date)
  }

  useEffect(() => {
    if (isCollapse == true) {
      if (collapseIndex != null) {
        setSelectedDate(obj[collapseIndex][field])
      } else {
        setSelectedDate(obj[field])
      }

    } else {
      formik.values[field] = selectedDate
    }
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <KeyboardDatePicker
        disabled={disabled ? disabled : false}
        fullWidth
        id={field}
        name={field}
        openTo="year"
        views={["year", "month","date"]}
        autoOk
        variant="inline"
        invalidLabel={invalidLabel}
        invalidDateMessage={invalidDateMessage}
        inputVariant={inputVariant}
        label={label}
        format={format}
        size={size}
        InputAdornmentProps={{ position: "end" }}
        onChange={date => handleChange(date)}
        value={selectedDate ? selectedDate : null}
        // error={formik.touched[field] && Boolean(formik.errors[field])}
        // helperText={formik.touched[field] && formik.errors[field]}
        disableFuture={disableFuture ? disableFuture : false}
        maxDateMessage={maxDateMessage ? maxDateMessage : null}
        allowKeyboardControl = {allowKeyboardControl ? allowKeyboardControl :false}
      />
    </MuiPickersUtilsProvider>
  );
}