import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_SENDGRID_API_KEY || "");
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await sendgrid.send({
      to: process.env.NEXT_EMAIL_RECEIVER, // Your email where you'll receive emails
      from: data.email, // sender's email address from the request
      subject: data.subject, // subject from the request
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
            <head>
            <meta charset="utf-8">
            
            <title>Contact Message</title>
            <meta name="description" content="Contact Message">
            <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

      <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
      </div>
      <div class="container" style="margin-left: 20px;margin-right: 20px;">
      <h3>You've got a new message from ${data.fullName}, their email is: ✉️${data.email} </h3>
      <div style="font-size: 16px;">
      <p>Message Details:</p>
      <p>${data.message}</p>
      <br>
      </div>
    </div>
    </div>
    </body>
    </html>`,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to send message",
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Message sent successfully",
  });
}
