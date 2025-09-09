import { PlusIcon } from "@heroicons/react/16/solid/index";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline/index";
import { CheckCircleIcon, CreditCardIcon } from "@heroicons/react/24/solid/index";
import { addNewAddressReqBody, type addNewAddressReqBodyType } from "common/dist/zod/requests/user.zod.js";
import { type ChangeEvent, useRef, useState } from "react";
import { Button } from "../../components/Button.tsx";
import Dialog from "../../components/Dialog/index.tsx";
import { Input } from "../../components/Input.tsx";
import { Loader } from "../../components/Loader.tsx";
import { SelectInput } from "../../components/SelectInput.tsx";
import { useAddNewAddressMutation, useGetMyAddressesQuery } from "../../redux/query/usersApiSlice.ts";
import { addAddress, initialNewAddress } from "../../redux/slices/cartSlice.ts";
import type { Store } from "../../redux/store.ts";
import { setIn } from "../../utils/object-mutation.util.ts";
import { useDispatch, useSelector } from "react-redux";


export function Shipping () {

    const dispatch = useDispatch();
    const addressInState = useSelector((state: Store) => state.cart.address);
    const [ addNewAddress ] = useAddNewAddressMutation();
    const { data: addresses, isLoading: loadingAddresses, error: addressesError, refetch: refetchAddresses } = useGetMyAddressesQuery(null);


    const [ selectedAddress, setSelectedAddress ] = useState<addNewAddressReqBodyType & { _id: string } | null>(null);
    const addAddressRef = useRef<HTMLButtonElement | null>(null);
    const [ newAddress, setNewAddress ] = useState<addNewAddressReqBodyType>(initialNewAddress);


    const handleAddAddress = async () => {
        const result = addNewAddressReqBody.safeParse(newAddress);
        if (!result.success) return { success: false, message: "Please fill in all the details correctly." };
        try {
            const response = await addNewAddress(result.data).unwrap();
            setNewAddress(initialNewAddress);
            return { success: true, message: response.data?.message || "Address added successfully." };
        } catch (error: any) {
            return { success: false, message: error?.data?.message || "Something went wrong, please try again later." };
        } finally {
            refetchAddresses();
        }
    };

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setNewAddress(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    }

    if (loadingAddresses) return <Loader />;
    if (addressesError) return <p>Error: {"Something went wrong, please try again later."}</p>;

    return (
        <main>
            <section className={"inner mt-12"}>
                <h1 className={"text-2xl font-bold"}>Shipping</h1>
                <p>Select an address to ship or create a new one.</p>
            </section>
            <section className={"inner mt-12"}>
                <div className={"flex items-center justify-between sm:justify-start gap-5 mb-5"}>
                    <h2 className={"text-xl font-bold"}>Your Addresses</h2>
                    <Button ref={addAddressRef} size={"small"} icon={PlusIcon}>Add new address</Button>
                    <Dialog
                        trigger={addAddressRef}
                        heading={"Add New Address"}
                        submitAction={handleAddAddress}
                        submitLabel={"Add Address"}
                    >
                        <form
                            onSubmit={(event) => event.preventDefault()}
                            className={"grid gap-3"}
                        >
                            <div className={"grid grid-cols-2 gap-3"}>
                                <Input
                                    name={"name.firstName"}
                                    label={"First Name"}
                                    placeholder={"Eg. John"}
                                    value={newAddress.name.firstName}
                                    autoFocus
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name={"name.lastName"}
                                    label={"Last Name"}
                                    placeholder={"Eg. Doe"}
                                    value={newAddress.name.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={"grid grid-cols-3 gap-3"}>
                                <SelectInput
                                    name={"countryCode"}
                                    label={"Country Code"}
                                    value={newAddress.countryCode}
                                    onChange={handleInputChange}
                                >
                                    <option value={"91"}>+91</option>
                                </SelectInput>
                                <Input
                                    name={"phoneNumber"}
                                    label={"Phone Number"}
                                    placeholder={"Eg. 9876543210"}
                                    value={newAddress.phoneNumber}
                                    containerClassName={"col-span-2"}
                                    onChange={handleInputChange}
                                    type={"number"}
                                    description={"Must be a 10 digits long number."}
                                />
                            </div>
                            <Input
                                name={"building"}
                                label={"Building"}
                                placeholder={"Eg. 123, Main Street"}
                                value={newAddress.building}
                                onChange={handleInputChange}
                                description={"Must be 10 characters or long."}
                            />
                            <Input
                                name={"street"}
                                label={"Street"}
                                placeholder={"Eg. Main Street"}
                                value={newAddress.street}
                                onChange={handleInputChange}
                                description={"Must be 10 characters or long."}
                            />
                            <div className={"grid grid-cols-2 gap-3"}>
                                <Input
                                    name={"city"}
                                    label={"City"}
                                    placeholder={"Eg. Mumbai"}
                                    value={newAddress.city}
                                    onChange={handleInputChange}
                                    description={"Must be 3 characters or long."}
                                />
                                <Input
                                    name={"state"}
                                    label={"State"}
                                    placeholder={"Eg. Maharashtra"}
                                    value={newAddress.state}
                                    onChange={handleInputChange}
                                    description={"Must be 3 characters or long."}
                                />
                            </div>
                            <div className={"grid grid-cols-2 gap-3"}>
                                <Input
                                    name={"pinCode"}
                                    label={"Pin Code"}
                                    placeholder={"Eg. 400001"}
                                    value={newAddress.pinCode}
                                    onChange={handleInputChange}
                                    description={"Must be 6 characters or long."}
                                />
                                <SelectInput
                                    name={"country"}
                                    label={"Country"}
                                    value={newAddress.country}
                                    onChange={handleInputChange}
                                >
                                    <option value={"India"}>India</option>
                                </SelectInput>
                            </div>
                        </form>
                    </Dialog>
                </div>
                <ul className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                    {!addresses?.data?.length
                        ? <li className={"col-span-4 h-20 flex flex-col items-center gap-2"}>
                            <ExclamationCircleIcon className={"size-10"} />
                            <span>You don't have any saved address.</span>
                        </li>
                        : addresses.data.map((address: typeof initialNewAddress & { _id: string }) => (
                            <li
                                key={address._id}
                                className={`border-2 rounded-2xl p-5 cursor-pointer relative ${(selectedAddress?._id === address._id || addressInState?._id === address._id) ? "bg-green-100 border-green-200" : "border-blue-100"}`}
                                onClick={() => {
                                    setSelectedAddress(address);
                                    dispatch(addAddress(address));
                                }}
                                role={"button"}
                                aria-selected={selectedAddress?._id === address._id}
                            >
                                {(selectedAddress?._id === address._id || addressInState?._id === address._id)
                                    && (<CheckCircleIcon className={"size-6 text-green-600 absolute right-2 top-2"} />)}
                                <p className={"text-lg font-semibold"}>
                                    {address.name.firstName} {address.name.lastName}
                                </p>
                                <p>+{address.countryCode} {address.phoneNumber}</p>
                                <p className={"text-sm leading-tight"}>{address.building}, {address.street}, {address.city}, {address.state}, {address.country} - {address.pinCode}</p>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className={"inner mt-4 mb-12 flex justify-end"}>
                <Button
                    to={"/account/checkout"}
                    size={"large"}
                    icon={CreditCardIcon}
                    className={"tracking-widest sm:w-max font-semibold mt-5"}
                    disabled={!addressInState?._id}
                >CONTINUE &rarr;</Button>
            </section>
        </main>
    );
}