import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    console.log("Checkout API called"); // DEBUG LINE

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      console.log("Missing API key");
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    const data = await req.json();
    // Generate Order ID

    const { name, email, grade, items, total } = data;
    const orderId =
      "GRP-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const order = {
      orderId,
      name,
      email,
      grade,
      items,
      total,
      date: new Date().toISOString(),
    };

    const orderList = items
      .map(
        (item: any) =>
          `${(item.price * item.qty).toFixed(2)} OMR — ${(item.price * item.qty).toFixed(2)} OMR`,
      )
      .join("\n");

    // EMAIL TO YOU
    const adminEmail = await resend.emails.send({
      from: "GRAPE Store <onboarding@resend.dev>",
      to: "grapehub00@gmail.com",
      subject: `New GRAPE Order — ${orderId}`,
      text: `
New Order Received

Order ID: ${orderId}
Name: ${name}
Email: ${email}
Grade: ${grade}


Items:
${orderList}

Total: ${total.toFixed(2)} OMR
`,
    });

    console.log("Admin email result:", adminEmail); // DEBUG

    // EMAIL TO STUDENT
    const studentEmail = await resend.emails.send({
      from: "GRAPE HUB <onboarding@resend.dev>",
      to: email,
      replyTo: "grapehub00@gmail.com",
      subject: "Your GRAPE HUB Order Confirmation",
      text: `
Hi ${name},

Your order has been successfully received.

Items:
${orderList}

Total: Total: ${total.toFixed(2)} OMR

We will contact you soon with pickup details.

— GRAPE Team
`,
    });

    console.log("Student email result:", studentEmail);

    return Response.json({
      success: true,
      orderId,
      order,
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err); // DEBUG
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}
