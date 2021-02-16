export function elapsedTimeFormat (time: string) {
    const elapsedTime = new Date().getTime() - new Date(time).getTime();
    return `- ${Math.floor(elapsedTime / 60000).toString()} minutes`;//1000ms is a second, 60000ms a min
}