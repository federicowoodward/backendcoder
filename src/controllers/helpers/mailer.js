// abhlrfpmvwrjzjmm
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'woodfederico@gmail.com', // generated ethereal user
      pass: 'abhlrfpmvwrjzjmm', // generated ethereal password
    },
  });