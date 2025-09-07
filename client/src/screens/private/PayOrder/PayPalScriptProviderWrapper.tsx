import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { ReactNode } from "react";


type Props = {
    children: ReactNode,
    paypalClientId: string,
};

export function PayPalScriptProviderWrapper ({ children, paypalClientId }: Props) {
    return (
        <PayPalScriptProvider
            deferLoading={true}
            options={{
                currency: "USD",
                clientId: paypalClientId,
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
}