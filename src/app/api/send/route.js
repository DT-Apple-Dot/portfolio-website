// app/api/send/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body.email, "this is email....");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: "dt.bot.ygn@gmail.com",
        pass: "pmls mlch qvmj spvi",
      },
    });

    const mailOptions = {
      from: "Message Bot <dt.bot.ygn@gmail.com>",
      to: "dt.appledot.ygn@gmail.com",
      subject: body.subject || "No Subject",
      text: `From: <${body.email}>\n${body.message || "No Message"}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err); // <--- CHECK this in your terminal
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
