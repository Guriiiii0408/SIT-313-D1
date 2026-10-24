require("dotenv").config({ path: "./task.env" });

const express = require("express");
const https = require("https");
const cors = require("cors");

const app = express();
const apikey = process.env.API_KEY;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const subscribers = [];

app.post("/api/subscribe", function (request, response) {
    console.log(request.body);

    const email = request.body.email;

    // Check if email is provided
    if (typeof email !== "string" || !email.trim()) {
        return response.status(400).send("Please enter your email address.");
    }

    const cleanEmail = email.trim();
    const emailParts = cleanEmail.split("@");

    if (
        emailParts.length !== 2 ||
        !emailParts[0] ||
        !emailParts[1] ||
        !emailParts[1].includes(".") ||
        emailParts[1].startsWith(".") ||
        emailParts[1].endsWith(".") ||
        cleanEmail.includes(" ")
    ) {
        return response.status(400).send("Please enter a valid email address.");
    }

    // Check for duplicate subscriptions
    if (subscribers.includes(cleanEmail.toLowerCase())) {
        return response.status(400).send("This email is already subscribed.");
    }

    // Check API key
    if (!apikey) {
        console.error("SendGrid API key is missing.");
        return response.status(500).send("Email service is not configured.");
    }

    // Welcome email
    const data = {
        personalizations: [
            {
                to: [
                    {
                        email: cleanEmail
                    }
                ],
                subject: "Welcome to My Newsletter"
            }
        ],
        from: {
            email: "gurshaansingh0408@gmail.com"
        },
        content: [
            {
                type: "text/html",
                value: `
                    <h1>Welcome!</h1>
                    <p>Thank you for subscribing to our newsletter.</p>
                    <p>We are happy to have you with us!</p>
                `
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apikey,
            "Content-Type": "application/json"
        }
    };

    const apiRequest = https.request(
        "https://api.sendgrid.com/v3/mail/send",
        options,
        function (apiResponse) {
            let responseData = "";

            console.log("SendGrid status code:", apiResponse.statusCode);

            apiResponse.on("data", function (chunk) {
                responseData += chunk;
            });

            apiResponse.on("end", function () {
                if (apiResponse.statusCode === 202) {
                    subscribers.push(cleanEmail.toLowerCase());

                    console.log("Welcome email sent successfully.");
                    console.log("Subscribers:", subscribers);

                    return response.status(200).send(
                        "Subscription successful! Welcome to our newsletter."
                    );
                }

                console.error("SendGrid error:", responseData);

                return response.status(500).send(
                    "Could not send the welcome email. Please try again."
                );
            });
        }
    );

    apiRequest.on("error", function (error) {
        console.error("Request error:", error.message);

        if (!response.headersSent) {
            response.status(500).send(
                "An error occurred while sending the email."
            );
        }
    });

    apiRequest.write(jsonData);
    apiRequest.end();
});

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});