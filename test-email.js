const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

async function testEmailMCP() {
  console.log("🧪 Testing Email MCP Server...\n");

  try {
    // Test the email MCP server endpoint
    const baseUrl = "http://localhost:3000/api/email";

    console.log("📬 Testing Email MCP Tools:\n");

    // Test 1: List existing emails
    console.log("1️⃣ Testing list_emails tool...");
    const listResponse = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "list_emails",
          arguments: { limit: 5 }
        }
      })
    });

    if (listResponse.ok) {
      const listResult = await listResponse.json();
      console.log("✅ List emails result:");
      console.log(listResult.result?.content?.[0]?.text || "No response");
    } else {
      console.log("❌ Failed to list emails");
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // Test 2: Read a specific email
    console.log("2️⃣ Testing read_email tool...");
    const readResponse = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "read_email",
          arguments: { email_id: "1" }
        }
      })
    });

    if (readResponse.ok) {
      const readResult = await readResponse.json();
      console.log("✅ Read email result:");
      console.log(readResult.result?.content?.[0]?.text || "No response");
    } else {
      console.log("❌ Failed to read email");
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // Test 3: Send an email
    console.log("3️⃣ Testing send_email tool...");
    const sendResponse = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "send_email",
          arguments: {
            to: "recipient@example.com",
            subject: "Test Email from MCP",
            content: "This is a test email sent through the MCP email server. The MCP functionality is working correctly!",
            from: "sender@example.com"
          }
        }
      })
    });

    if (sendResponse.ok) {
      const sendResult = await sendResponse.json();
      console.log("✅ Send email result:");
      console.log(sendResult.result?.content?.[0]?.text || "No response");
    } else {
      console.log("❌ Failed to send email");
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // Test 4: Simulate receiving an email
    console.log("4️⃣ Testing simulate_receive_email tool...");
    const receiveResponse = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "simulate_receive_email",
          arguments: {
            from: "newuser@example.com",
            subject: "New Message via MCP Demo",
            content: "Hello! This is a new email received through the MCP email system. This demonstrates the email receiving functionality of the MCP server."
          }
        }
      })
    });

    if (receiveResponse.ok) {
      const receiveResult = await receiveResponse.json();
      console.log("✅ Simulate receive email result:");
      console.log(receiveResult.result?.content?.[0]?.text || "No response");
    } else {
      console.log("❌ Failed to simulate receive email");
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // Test 5: List emails again to see the new email
    console.log("5️⃣ Testing list_emails after receiving new email...");
    const listResponse2 = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "list_emails",
          arguments: { limit: 3, unread_only: true }
        }
      })
    });

    if (listResponse2.ok) {
      const listResult2 = await listResponse2.json();
      console.log("✅ List unread emails result:");
      console.log(listResult2.result?.content?.[0]?.text || "No response");
    } else {
      console.log("❌ Failed to list unread emails");
    }

    console.log("\n🎉 Email MCP Server testing completed!");
    console.log("\n📚 Available tools:");
    console.log("• send_email - Send emails to recipients");
    console.log("• list_emails - List emails in inbox");
    console.log("• read_email - Read full email content");
    console.log("• simulate_receive_email - Demo: simulate receiving emails");
    console.log("\n💡 This demonstrates a complete email MCP server with sending and receiving capabilities!");

  } catch (error) {
    console.error("❌ Error testing Email MCP:", error.message);
    console.log("\n🚀 Make sure the Next.js server is running with: npm run dev");
  }
}

// Run the test
testEmailMCP();