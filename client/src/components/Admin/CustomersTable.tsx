import type { IUserRawDoc } from "common/dist/mongoose/user.types.ts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify/unstyled";
import { useGetCustomersQuery, useUpdateUserStatusMutation } from "../../redux/query/usersApiSlice.ts";
import Avatar from "../Avatar/index.tsx";
import { ToggleInput } from "../ToggleInput.tsx";


type PropsOptional = {
    filterKey?: never
    filterValue?: never;
}
type PropsRequired = {
    filterKey: keyof IUserRawDoc;
    filterValue: any;
};

type Props = PropsOptional | PropsRequired;

export function CustomersTable ({ filterKey, filterValue }: Props) {

    const [ updateCustomerStatus, { isLoading: updatingCustomerStatus } ] = useUpdateUserStatusMutation();
    const { data: fetchedCustomersData, isLoading: fetchingCustomerData, error } = useGetCustomersQuery({ size: 1000 }, { refetchOnMountOrArgChange: true });
    const [ customers, setCustomers ] = useState<Array<IUserRawDoc & { _id: string }>>([]);
    const [ customersLength, setCustomersLength ] = useState<number>(0);

    const handleStatusToggle = async (customerId: string) => {
        try {
            const result = await updateCustomerStatus(customerId).unwrap();
            if (!result.success) throw new Error(result.message);
            toast.success("User updated successfully.");
            setCustomers(prevCustomers => {
                return prevCustomers.map(customer => (customer._id === customerId ? { ...customer, status: result.data.status } : customer));
            });
        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while updating the customer status.");
        }
    };

    useEffect(() => {
        setCustomers(fetchedCustomersData?.data || []);
    }, [ fetchedCustomersData ]);

    useEffect(() => {
        setCustomersLength(customers.filter((customer: IUserRawDoc) => !filterKey ? true : customer[filterKey] === filterValue).length || 0);
    }, [ customers ]);


    if (error) return <p className={"italic text-red-500"}>Error: {"message" in error ? error.message : "Something went wrong please try reloading the page..."}</p>;

    else if (fetchedCustomersData && !fetchedCustomersData.success) return <p className={"italic text-red-500"}>Error: {fetchedCustomersData?.message || "Something went wrong please try reloading the page..."}</p>;

    else if (!customersLength) return <div>Nothing found.</div>;

    else if (fetchingCustomerData) return <div>Loading...</div>;

    else
        return (

            <table className={"w-full border-separate border-spacing-y-2 text-left"}>
                <thead>
                <tr className={"*:bg-blue-100 *:text-slate-700 *:p-2 rounded-lg"}>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className={"text-center"}>Status</th>
                </tr>
                </thead>
                <tbody className={"*:odd:bg-blue-50"}>
                {customers
                    .filter((customer: IUserRawDoc) => !filterKey ? true : customer[filterKey] === filterValue)
                    .map((customer) => {
                            const customerName = `${customer.name.firstName} ${customer.name.lastName}`;
                            return (
                                <tr key={customer._id} className={`*:text-slate-700 leading-tight *:p-2`}>
                                    <td className={"max-w-max"}>
                                        <Avatar src={customer.avatar?.url} alt={customerName} fallback={customerName} />
                                    </td>
                                    <td>{customerName}</td>
                                    <td>{customer.email}</td>
                                    <td className={"*:m-auto"}>
                                        <ToggleInput
                                            name={customer._id}
                                            checked={customer.status}
                                            serious
                                            disabled={updatingCustomerStatus}
                                            onChange={() => handleStatusToggle(customer._id)}
                                        />
                                    </td>
                                </tr>
                            );
                        },
                    )
                }
                </tbody>
            </table>
        )
            ;
}