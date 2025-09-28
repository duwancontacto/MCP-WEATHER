# Email MCP Server Demo

This demo showcases a Model Context Protocol (MCP) server that provides email functionality, including sending emails and managing received email content.

## Features

The Email MCP server provides the following tools:

### 📧 Core Email Tools

1. **`send_email`** - Send emails to recipients
   - Parameters: `to`, `subject`, `content`, `from` (optional)
   - Simulates email sending (can be configured for real SMTP)

2. **`list_emails`** - List received emails in inbox
   - Parameters: `limit` (optional), `unread_only` (optional)
   - Shows email previews with metadata

3. **`read_email`** - Read full content of a specific email
   - Parameters: `email_id`
   - Marks email as read when accessed

4. **`simulate_receive_email`** - Demo tool to simulate receiving emails
   - Parameters: `from`, `subject`, `content`
   - Adds new emails to the inbox for testing

## Getting Started

### 1. Start the MCP Server

```bash
npm run dev
```

The email MCP server will be available at: `http://localhost:3000/api/email`

### 2. Test the Email Functionality

Run the test script to see all email tools in action:

```bash
node test-email.js
```

### 3. Use with Claude Desktop

Add this configuration to your Claude Desktop MCP settings:

```json
{
  "mcpServers": {
    "email-demo": {
      "command": "node",
      "args": ["-e", "require('http').request('http://localhost:3000/api/email', {method:'POST'}, res => res.pipe(process.stdout)).end()"],
      "env": {}
    }
  }
}
```

## Demo Scenario

The demo includes pre-populated sample emails to demonstrate the email receiving functionality:

1. **Welcome Email** - Introduction to the MCP email demo
2. **Status Update** - Example notification email

You can:
- List all emails or filter to unread only
- Read individual emails (marks them as read)
- Send new emails
- Simulate receiving new emails

## Example Usage

### Send an Email
```javascript
// Call send_email tool
{
  "to": "user@example.com",
  "subject": "Hello from MCP",
  "content": "This email was sent through the MCP server!",
  "from": "sender@example.com"
}
```

### List Unread Emails
```javascript
// Call list_emails tool
{
  "limit": 10,
  "unread_only": true
}
```

### Read Specific Email
```javascript
// Call read_email tool
{
  "email_id": "1"
}
```

## Production Configuration

For production use, uncomment and configure the nodemailer setup in `/app/api/email/route.ts`:

```javascript
const transporter = nodemailer.createTransporter({
  host: "smtp.gmail.com", // Your SMTP provider
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

Set environment variables:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Architecture

- **Backend**: Next.js API route with MCP handler
- **Email Simulation**: Mock storage for demo purposes
- **Real Email**: Nodemailer integration ready for production
- **Protocol**: Standard MCP tools interface

## Benefits of MCP for Email

1. **Standardized Interface**: Consistent email operations across different AI applications
2. **Tool Discovery**: AI can automatically discover available email capabilities
3. **Type Safety**: Zod schemas ensure proper parameter validation
4. **Extensible**: Easy to add new email-related tools (filters, folders, etc.)
5. **Secure**: Environment-based configuration for credentials

This demo shows how MCP can be used to create powerful, reusable email capabilities that any AI application can leverage through the standard MCP protocol.