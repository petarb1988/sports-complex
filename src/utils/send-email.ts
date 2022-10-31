import logger from "../logger";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

export default async ({
  to,
  from = "petar.biocic@gmail.com",
  subject = "Sports Complex Notification",
  text = "",
}: {
  to: string;
  from: string;
  subject: string;
  text: string;
}) => {
  try {
    await sgMail.send({ to, from, subject, text });
    return;
  } catch (error: any) {
    logger(`Send Email Error: `, error);
    return;
  }
};
