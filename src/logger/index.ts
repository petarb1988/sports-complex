import util from "util";

export default (msg: string, msgObject: any = null): void => {
  const fixedMsgObject: string = !msgObject ? "" : util.inspect(msgObject);

  const currentDate: Date = new Date();

  const year: string = currentDate.getUTCFullYear().toString();
  const month: string = currentDate.getUTCMonth().toString().padStart(2, "0");
  const day: string = currentDate.getUTCDate().toString().padStart(2, "0");
  const hour: string = currentDate.getUTCHours().toString().padStart(2, "0");
  const minute: string = currentDate.getUTCMinutes().toString().padStart(2, "0");
  const second: string = currentDate.getUTCSeconds().toString().padStart(2, "0");
  const millisecond: string = currentDate.getUTCMonth().toString().padStart(3, "0");

  const envir = process.env.NODE_ENV;

  const logMessage = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} (UTC) [${envir}] ${msg}${fixedMsgObject}`;

  console.log(logMessage);
  return;
};
