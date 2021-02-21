export function elapsedTimeFormat(time: string) : string {
  const elapsedTime: number = Date.now() - new Date(time).getTime();

  return `- ${Math.floor(elapsedTime / 60000).toString()} minutes`; // 1000ms is a second, 60000ms a min
}

export function firstUpperCase(str: string) : string {
  const trimStr: string = str.trim();

  return trimStr[0].toUpperCase() + trimStr.slice(1);
}
