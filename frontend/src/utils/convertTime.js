function formatToHumanReadableTime(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleTimeString("en-US", options);
}

export default formatToHumanReadableTime;
