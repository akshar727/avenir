import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const plans = {
  standard: 8.99,
  premium: 14.99,
};

export default function Page() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const plan = router.query.plan;
  const capitalizedPlan = plan
    ? plan.charAt(0).toUpperCase() + plan.slice(1)
    : "";
  const price = plans[plan as keyof typeof plans] || 0;
  // React.useEffect(() => {
  //   if (!(plan in plans)) {
  //     router.push("/");
  //   }
  // }, []);
  const onApprove = (data) => {
    alert(`You have successfully subscribed to ${data.subscriptionID}`); // Optional message given to subscriber
  };
  // alert(plan)

  return (
    <div className="checkout-page flex justify-center items-center h-screen">
      <Card className="w-96 p-5">
        <h1 className="text-3xl text-center mb-4">Checkout</h1>
        <div className="plan-details flex justify-between mb-2">
          <span>{capitalizedPlan} Plan</span>
          <span>${price}</span>
        </div>
        <div className="plan-details flex justify-between mb-2">
          <span>Sales Tax</span>
          <span>${parseFloat(0.0725 * price).toFixed(2)}</span>
        </div>
        <form>
          <div className="total mb-6 flex justify-between mt-5">
            <span>Total</span>
            <span>${parseFloat(1.0725 * price).toFixed(2)}</span>
          </div>
          <PayPalScriptProvider
            options={{
              clientId:
                "AYdXNuFB7AgVDwb2dXz9JSDQ5Zrlqso78zdQSYULkGUodCuOdOeOGqw_mo_RCp1ffwj3tB_mtyZ5IIir",
              vault: true,
              intent: "subscription",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              onApprove={onApprove}
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id:plan ==="standard" ? "P-5CV71987W2249252AM5M366Y": "P-0NN47429MU9777400M5M4MVA",
                });
              }}
            />
          </PayPalScriptProvider>
        </form>
      </Card>
    </div>
  );
}
