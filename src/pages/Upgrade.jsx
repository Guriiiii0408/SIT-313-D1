
import { useState } from "react";
import { useAuth } from "../Authorisation.jsx";
import "./Upgrade.css";

function Upgrade() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleUpgrade = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setShowModal(true);
  };

  return (
    <main className="upgrade-page">
      <h1>Upgrade Your Plan</h1>
      <p>Unlock premium features with a subscription.</p>

      <div className="upgrade-card">
        <h2>Premium Plan</h2>
        <p className="upgrade-price">$9.99 / month</p>

        <ul>
          <li>Access premium content</li>
          <li>Enhanced learning experience</li>
          <li>All free-plan features</li>
        </ul>

        <button onClick={handleUpgrade}>
          Upgrade Now
        </button>
      </div>

      {showModal && (
        <div className="upgrade-modal-backdrop">
          <div className="upgrade-modal">
            <h2>Confirm Your Upgrade</h2>
            <p>You're choosing the Premium Plan for $119.99/month.</p>

            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>

            <button
              onClick={() => {
                alert("Subscription functionality will be connected next.");
                setShowModal(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Upgrade;