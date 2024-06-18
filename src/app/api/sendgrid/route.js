import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_SENDGRID_API_KEY);
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  try {
    await sendgrid.send({
      to: "pob944@hotmail.com", // Your email where you'll receive emails
      from: "pob944@gmail.com", // your website email address here
      subject: `[Lead from website] : ${data.subject}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
            <head>
            <meta charset="utf-8">
            
            <title>The HTML5 Herald</title>
            <meta name="description" content="The HTML5 Herald">
            <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

      <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
      </div>
      <div class="container" style="margin-left: 20px;margin-right: 20px;">
      <h3>You've got a new mail from ${data.fullname}, their email is: ✉️${data.email} </h3>
      <div style="font-size: 16px;">
      <p>Message:</p>
      <p>${data.message}</p>
      <br>
      </div>
      <img src="https://manuarora.in/logo.png" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
    </div>
    </div>
    </body>
    </html>`,
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ error: "" });
}
