export function delayTime(timeDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeDelay);
  });
}
