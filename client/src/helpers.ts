export function elapsedTimeFormat(time: string) : string {
  const elapsedTime = new Date().getTime() - new Date(time).getTime();

  return `- ${Math.floor(elapsedTime / 60000).toString()} minutes`; // 1000ms is a second, 60000ms a min
}

export function fistUpperCase(str: string) : string {
  const trimStr = str.trim();

  return trimStr.toUpperCase() + trimStr.slice(1);
}