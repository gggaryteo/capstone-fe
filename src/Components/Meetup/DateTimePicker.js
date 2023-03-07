import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import useWindowSize from "../../hooks/useWindowSize";

export default function DateTimePicker(props) {
  // if mobile view and if desktop view
  const windowSize = useWindowSize();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {windowSize.width < 1232 ? (
        <MobileDateTimePicker
          required
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      ) : (
        <DesktopDateTimePicker
          required
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      )}
    </LocalizationProvider>
  );
}
