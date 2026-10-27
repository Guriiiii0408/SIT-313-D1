
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../Authorisation.jsx";
import "./Pricing.css";

function Pricing() {
  const { user, loading } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("Free");
  const [checkingPlan, setCheckingPlan] = useState(true);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Load the user's current plan from Firestore
  useEffect(() => {
    let cancelled = false;

    async function loadPlan() {
      if (loading) return;

      if (!user) {
        setPlan("Free");
        setCheckingPlan(false);
        return;
      }

      setCheckingPlan(true);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!cancelled) {
          const userData = userSnapshot.exists()
            ? userSnapshot.data()
            : {};

          if (
            userData.plan === "Paid" ||
            userData.plan === "Premium"
          ) {
            setPlan("Paid");
          } else {
            setPlan("Free");
          }
        }
      } catch (err) {
        console.error("Unable to load user plan:", err);

        if (!cancelled) {
          setError("Unable to load your plan. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setCheckingPlan(false);
        }
      }
    }

    loadPlan();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  // Open the payment modal
  const handleUpgradeClick = () => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("Please log in before upgrading your plan.");
      return;
    }

    if (plan === "Paid") {
      setError("You are already on the Paid plan.");
      return;
    }

    setShowModal(true);
  };

  // Validate payment details and update Firestore
  const handlePayment = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Please log in before upgrading.");
      return;
    }

    const cleanedCardNumber = cardNumber.split(" ").join("");

    // Validate cardholder name
    if (cardName.trim().length < 2) {
      setError("Please enter the cardholder name.");
      return;
    }

    // Validate the 16-digit demo card number without regex
    const cardDigitsOnly = cleanedCardNumber
      .split("")
      .every((digit) => "0123456789".includes(digit));

    if (
      cleanedCardNumber.length !== 16 ||
      !cardDigitsOnly
    ) {
      setError("Enter a 16-digit demo card number.");
      return;
    }

    // Validate expiry in MM/YY format without regex
    const expiryParts = expiry.split("/");

    if (
      expiryParts.length !== 2 ||
      expiryParts[0].length !== 2 ||
      expiryParts[1].length !== 2
    ) {
      setError("Enter expiry in MM/YY format.");
      return;
    }

    const expiryDigitsOnly = expiryParts.every((part) =>
      part
        .split("")
        .every((digit) => "0123456789".includes(digit))
    );

    if (!expiryDigitsOnly) {
      setError("Enter a valid expiry date.");
      return;
    }

    const month = Number(expiryParts[0]);
    const year = Number(expiryParts[1]);

    if (month < 1 || month > 12) {
      setError("Enter a valid expiry month.");
      return;
    }

    const expiryDate = new Date(2000 + year, month);

    if (expiryDate <= new Date()) {
      setError("The card expiry date must be in the future.");
      return;
    }

    // Validate the 3- or 4-digit demo CVV without regex
    const cvvDigitsOnly = cvv
      .split("")
      .every((digit) => "0123456789".includes(digit));

    if (
      (cvv.length !== 3 && cvv.length !== 4) ||
      !cvvDigitsOnly
    ) {
      setError("Enter a valid 3- or 4-digit demo CVV.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      const currentData = userSnapshot.exists()
        ? userSnapshot.data()
        : {};

      // Prevent an already-paid user from upgrading again
      if (
        currentData.plan === "Paid" ||
        currentData.plan === "Premium"
      ) {
        setPlan("Paid");
        setShowModal(false);
        setError("You are already on the Paid plan.");
        return;
      }

      // Demo subscription: no real payment is processed.
      // Never save card details or CVV in Firestore.
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          plan: "Paid",
          subscriptionUpdatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setPlan("Paid");
      setShowModal(false);

      setSuccess(
        "✅ Subscription successful!"
      );

      setCardName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (err) {
      console.error("Subscription update failed:", err);

      setError(
        "Unable to update your plan. Please try again."
      );
    }
  };

  return (
    <main className="pricing-page">
      <h1>Choose Your Plan</h1>

      <p className="pricing-description">
        Select the plan that best suits your needs.
      </p>

      {/* Green success message */}
      {success && (
        <p className="subscription-success" role="status">
          {success}
        </p>
      )}

      {/* Error displayed on the page */}
      {error && !showModal && (
        <p className="pricing-error" role="alert">
          {error}
        </p>
      )}

      {checkingPlan && user && (
        <p>Loading your plan...</p>
      )}

      <div className="pricing-container">
        {/* Free Plan */}
        <div className="pricing-card">
          <h2>Free Plan</h2>

          <p className="price">
            $0 <span>/ month</span>
          </p>

          <ul>
            <li>Browse articles and tutorials</li>
            <li>Access basic features</li>
            <li>Manage your account</li>
          </ul>

          {plan === "Free" ? (
            <span className="current-plan-label">
              Current Plan
            </span>
          ) : (
            <span className="current-plan-label">
              Free Plan
            </span>
          )}
        </div>

        {/* Paid Plan */}
        <div className="pricing-card premium-card">
          <h2>Paid Plan</h2>

          <p className="price">
            $119.99 <span>/ month</span>
          </p>

          <ul>
            <li>Everything in the Free Plan</li>
            <li>Access premium content</li>
            <li>Enhanced learning experience</li>
          </ul>

          {loading || checkingPlan ? (
            <button
              type="button"
              className="pricing-button"
              disabled
            >
              Loading...
            </button>
          ) : plan === "Paid" ? (
            <button
              type="button"
              className="pricing-button"
              disabled
            >
              Current Paid Plan
            </button>
          ) : user ? (
            <button
              type="button"
              className="pricing-button"
              onClick={handleUpgradeClick}
            >
              Upgrade Plan
            </button>
          ) : (
            <Link
              to="/login"
              className="pricing-button"
            >
              Login to Upgrade
            </Link>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div
          className="payment-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="payment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close payment form"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h2 id="payment-title">
              Upgrade to Paid
            </h2>

            <p className="payment-price">
              $119.99 / month
            </p>

            <form onSubmit={handlePayment}>
              <label htmlFor="card-name">
                Cardholder Name
              </label>

              <input
                id="card-name"
                type="text"
                value={cardName}
                onChange={(event) =>
                  setCardName(event.target.value)
                }
                placeholder="Enter cardholder name"
                autoComplete="off"
                required
              />

              <label htmlFor="card-number">
                Card Number
              </label>

              <input
                id="card-number"
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) => {
                  const value = event.target.value
                    .split("")
                    .filter((character) =>
                      "0123456789".includes(character)
                    )
                    .join("")
                    .slice(0, 16);

                  setCardNumber(value);
                }}
                placeholder="16-digit demo number"
                autoComplete="off"
                required
              />

              <div className="payment-fields-row">
                <div>
                  <label htmlFor="card-expiry">
                    Expiry (MM/YY)
                  </label>

                  <input
                    id="card-expiry"
                    type="text"
                    value={expiry}
                    onChange={(event) => {
                      const value = event.target.value
                        .split("")
                        .filter((character) =>
                          "0123456789".includes(character)
                        )
                        .join("")
                        .slice(0, 4);

                      if (value.length > 2) {
                        setExpiry(
                          value.slice(0, 2) +
                            "/" +
                            value.slice(2)
                        );
                      } else {
                        setExpiry(value);
                      }
                    }}
                    placeholder="MM/YY"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="card-cvv">
                    CVV
                  </label>

                  <input
                    id="card-cvv"
                    type="password"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(event) => {
                      const value = event.target.value
                        .split("")
                        .filter((character) =>
                          "0123456789".includes(character)
                        )
                        .join("")
                        .slice(0, 4);

                      setCvv(value);
                    }}
                    placeholder="123"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="pricing-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="pricing-button payment-submit"
              >
                Confirm Subscription
              </button>

              <button
                type="button"
                className="cancel-payment-button"
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Pricing;