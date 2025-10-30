// create  ac controoler
export const CreateMessage = async (name) => {
  // your code here

  try {
    const response = await fetch(
      "https://graph.facebook.com/v22.0/788688991002351/messages",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "917409814407",
          type: "template",
          template: {
            name: "welcome", // replace with your template
            language: { code: "en_US" },
            components: [
              {
                type: "header",

                parameters: [
                  { type: "text", text: name }, // body placeholder if any
                ],
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();
    console.log("✅ Message sent response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

export default CreateMessage;
