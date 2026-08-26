// this page resend page usein resend 

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

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

