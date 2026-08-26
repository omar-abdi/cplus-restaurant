// this page resend page usein resend 

import { Resend } from "resend";

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

    // dotenv.config() runs when the server starts. Creating Resend here avoids
    // reading the key before that setup has completed during ESM module loading.
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return res.status(500).json({
        message: "Email service is not configured",
      });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "omarcabdi0008@gmail.com",
      subject: subject,
      html: `
        <h2>New Contact Message from your customer</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(500).json({
        message: "Failed to send email",
        error,
      });
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

