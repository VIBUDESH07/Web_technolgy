
# Machine Supervision System

## Overview

The Machine Supervision System is built using the MERN stack (MongoDB, Express, React, Node.js) and includes features for scheduling supervision tasks, handling CRUD operations, and managing user authentication. The system also integrates SMTP for email notifications and allows for scheduled tasks at 8:00 AM daily.

## Features

- **CRUD Operations:** Manage machines, supervision records, and user profiles.
- **User Authentication:** Secure login and registration functionalities.
- **Email Notifications:** SMTP integration for sending notifications.
- **Scheduling:** Supervision tasks are scheduled to run at 8:00 AM daily.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Email:** SMTP
- **Scheduling:** Node.js scheduling libraries (e.g., node-schedule or cron)

## Setup

### Prerequisites

- Node.js (>= 14.x)
- MongoDB
- npm (or yarn)
- SMTP Server credentials

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo/machine-supervision.git
   cd machine-supervision
   ```

2. **Install Backend Dependencies:**

   Navigate to the `backend` directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   ```

4. **Start the Backend Server:**

   ```bash
   npm start
   ```

5. **Install Frontend Dependencies:**

   Navigate to the `frontend` directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the Frontend Development Server:**

   ```bash
   npm start
   ```

### Scheduling

The application uses `node-schedule` for scheduling tasks. To configure the schedule, ensure that the scheduling job is set up in the backend. The job will execute at 8:00 AM daily.

**Example configuration:**

In the `backend` directory, create a file named `scheduler.js`:

```javascript
const schedule = require('node-schedule');
const supervisionTask = require('./tasks/supervisionTask');

// Schedule a task to run every day at 8:00 AM
schedule.scheduleJob('0 8 * * *', function() {
  supervisionTask.run();
});
```

**Example task implementation:**

In the `tasks` directory, create a file named `supervisionTask.js`:

```javascript
const sendEmail = require('../utils/emailUtils');

exports.run = function() {
  // Logic for the supervision task
  // e.g., fetch machine status, generate report

  // Send email notification
  sendEmail('recipient@example.com', 'Daily Supervision Report', 'Here is the daily report...');
};
```

### SMTP Integration

To send emails, configure the `sendEmail` function in `utils/emailUtils.js`:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmail = function(to, subject, text) {
  const mailOptions = {
    from: 'your_email@example.com',
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};
```

## Usage

- **Login/Register:** Access the application via the React frontend and use the provided authentication functionality.
- **Manage Machines:** Use the CRUD interfaces to add, update, or delete machine records.
- **Receive Notifications:** Expect email notifications as configured in the SMTP settings.

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to [your_email@example.com](mailto:your_email@example.com).

---
