import dotenv from "dotenv";
import express, { text } from "express";
import fs from "fs";
import FormData from "form-data";


// import fetch from "node-fetch";

dotenv.config();

async function sendTemplateMessage() {
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
                  { type: "text", text: "John" }, // body placeholder if any
                ],
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();
    console.log("✅ Message sent response:", data);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
}

sendTemplateMessage();

// sendTemplateMessage();

async function sendtextmessage() {
  try {
    const response = await fetch(
      "https://graph.facebook.com/v22.0/788688991002351/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`, // Use correct variable name
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "917409814407", // no "whatsapp:" prefix needed
          type: "text",
          text: {
            body: "Hello, light",
          },
        }),
      }
    );

    const data = await response.json(); // Parse the JSON response
    console.log("✅ Message sent response:", data);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
}

async function sendMediaMeassge(params) {
  try {
    const response = await fetch(
      "https://graph.facebook.com/v22.0/788688991002351/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`, // Use correct variable name
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "917409814407", // no "whatsapp:" prefix needed
          type: "image",
          image: {
            link: "https://dummyimage.com/600x400/000/fff.png&text=light",
            caption: "Hello, light",
          },
        }),
      }
    );

    const data = await response.json(); // Parse the JSON response
    console.log("✅ Message sent response:", data);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
}

async function uploadImage() {
  try {
    const imagedata = new FormData();

    imagedata.append("messaging_product", "whatsapp");
    imagedata.append("messaging_product", "whatsapp");
    imagedata.append(
      "file",
      fs.createReadStream(process.cwd() + "/naruto.jpg")
    );

    const response = await fetch(
      "https://graph.facebook.com/v22.0/788688991002351/media",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`, // Must match your .env variable
        },
        body: imagedata,
      }
    );

    const data = await response.json();
    console.log("✅ Upload response:", data);
  } catch (error) {
    console.error("❌ Error uploading image:", error);
  }
}

// sendtextmessage();
// sendMediaMeassge();
// uploadImage();
// sendTemplateMessage();

// sendTemplateMessage();

async function testsendTemplateMessage() {
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
            name: "hello_world", // working test template
            language: { code: "en_US" },
            // Uncomment below if your template has placeholders
            // components: [
            //   {
            //     type: "body",
            //     parameters: [
            //       { type: "text", text: "John" }, // replaces {{1}}
            //       { type: "text", text: "1234" } // replaces {{2}}
            //     ]
            //   },
            //   {
            //     type: "button",
            //     sub_type: "url",
            //     index: 0,
            //     parameters: [
            //       { type: "text", text: "https://example.com" }
            //     ]
            //   }
            // ]
          },
        }),
      }
    );

    const data = await response.json();
    console.log("✅ Message sent response:", data);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
}

// sendTemplateMessage();
