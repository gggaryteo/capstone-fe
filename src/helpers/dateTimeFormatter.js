function dateTimeFormatter(dateTime) {
  return new Date(dateTime).toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export default dateTimeFormatter;
