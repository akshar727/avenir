import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
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
    const plan = router.asPath.split("/").pop();
    const capitalizedPlan = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "";
    const price = plans[plan as keyof typeof plans] || 0;
    React.useEffect (() => {
    if (!(plan in plans)) {
        router.push("/");
    }
    }, []);

    return (
        <PayPalScriptProvider options={{ "clientId": "AYdXNuFB7AgVDwb2dXz9JSDQ5Zrlqso78zdQSYULkGUodCuOdOeOGqw_mo_RCp1ffwj3tB_mtyZ5IIir" }}>
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
                        <div className="total flex justify-between mt-5">
                            <span>Total</span>
                            <span>${price}</span>
                        </div>
                        <PayPalButtons style={{ layout: 'vertical' }} options={{intent:"subscription"}} createSubscription={(data, actions) => {
                            return actions.subscriptions.create({
                                purchase_units: [{
                                    amount: {
                                        currency_code: "USD",
                                        value: price.toString(),
                                    },
                                    plan_id: plan === "standard" ? "P-StandardPlanID" : "P-PremiumPlanID",
                                    custom_id: "SalesTax",
                                    description: `Sales tax of ${parseFloat(0.0725 * price).toFixed(2)} USD`,
                                }],
                            });
                        }} />
                    </form>
                </Card>
            </div>
        </PayPalScriptProvider>
    );
};