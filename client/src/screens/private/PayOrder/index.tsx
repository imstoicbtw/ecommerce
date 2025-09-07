import { PayPalScriptProviderWrapper } from "./PayPalScriptProviderWrapper.tsx";
import { Screen } from "./Screen.tsx";
import { useGetPaypalClientIdQuery } from "../../../redux/query/paymentApiSlice.ts";
import { Loader } from "../../../components/Loader.tsx";


export function PayOrder () {

    const { currentData: paypal, isLoading: loadingPaypal, error: paypalError } = useGetPaypalClientIdQuery(null);

    if (loadingPaypal) return <Loader />;
    if (paypalError) return <div>Error: Something went wrong, please try reloading the page.</div>;
    return (
        <PayPalScriptProviderWrapper paypalClientId={paypal?.clientId}>
            <Screen paypalClientId={paypal?.clientId} />
        </PayPalScriptProviderWrapper>
    );

}