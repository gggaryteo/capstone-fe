import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";

export default function DateTimePicker(props) {
  // if mobile view and if desktop view

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={5}>
        {/* for mobile */}
        <MobileDateTimePicker
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* for desktop */}
        <DesktopDateTimePicker
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
