import { useState } from "react";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

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
            setMessage("Please enter a valid email");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/subscribe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: cleanEmail })
                }
            );

            const result = await response.text();

            if (response.ok) {
                setMessage(
                    "Subscription successful! Welcome to our newsletter."
                );
                setEmail("");
            } else {
                setMessage(result);
            }
        } catch (error) {
            setMessage("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <section className="newsletter">
            <h2>Sign up for our daily newsletter</h2>

            <form onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <button type="submit">Subscribe</button>
            </form>

            <p>{message}</p>
        </section>
    );
}

export default Newsletter;