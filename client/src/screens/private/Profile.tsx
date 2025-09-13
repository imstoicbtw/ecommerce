import { PlusIcon } from "@heroicons/react/16/solid/index";
import { LockClosedIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline/index";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import { addNewAddressReqBody, type addNewAddressReqBodyType, updateCurrentUserDetailsReqBody, type updateCurrentUserDetailsReqBodyType, updatePasswordReqBody, type updatePasswordReqBodyType } from "common/dist/zod/requests/user.zod.js";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify/unstyled";
import Avatar from "../../components/Avatar/index.tsx";
import { Button } from "../../components/Button.tsx";
import Dialog from "../../components/Dialog/index.tsx";
import { Input } from "../../components/Input.tsx";
import { Loader } from "../../components/Loader.tsx";
import { SelectInput } from "../../components/SelectInput.tsx";
import { useGetMyOrdersQuery } from "../../redux/query/ordersApiSlice.ts";
import { useAddNewAddressMutation, useDeleteMyAddressMutation, useGetCurrentUserQuery, useGetMyAddressesQuery, useUpdateCurrentUserDetailsMutation, useUpdatePasswordMutation, useUploadAvatarMutation } from "../../redux/query/usersApiSlice.ts";
import { initialNewAddress } from "../../redux/slices/cartSlice.ts";
import { setUser } from "../../redux/slices/userSlice.ts";
import { setIn } from "../../utils/object-mutation.util.ts";


export function Profile () {

    const dispatch = useDispatch();

    const [ updateCurrentUserDetails ] = useUpdateCurrentUserDetailsMutation();
    const [ deleteMyAddress, { isLoading: loadingDeleteAddressMutation } ] = useDeleteMyAddressMutation();
    const [ uploadAvatar, { isLoading: loadingUploadAvatarMutation } ] = useUploadAvatarMutation();
    const [ addNewAddress ] = useAddNewAddressMutation();
    const [ updatePassword ] = useUpdatePasswordMutation();

    const { data: user, isLoading: loadingUser, refetch: refetchUser } = useGetCurrentUserQuery(null, {
        refetchOnMountOrArgChange: true,
    });
    const { data: orders, isLoading: loadingOrders } = useGetMyOrdersQuery(null, {
        refetchOnMountOrArgChange: true,
    });
    const { data: addresses, isLoading: loadingAddresses, refetch: refetchAddresses } = useGetMyAddressesQuery(null, {
        refetchOnMountOrArgChange: true,
    });

    const editProfileButtonRef = useRef<HTMLButtonElement | null>(null);
    const addAddressRef = useRef<HTMLButtonElement | null>(null);
    const updatePasswordButtonRef = useRef<HTMLButtonElement | null>(null);

    const [ editProfile, setEditProfile ] = useState<Partial<updateCurrentUserDetailsReqBodyType>>({});
    const [ newAddress, setNewAddress ] = useState<addNewAddressReqBodyType>(initialNewAddress);
    const [ password, setPassword ] = useState<updatePasswordReqBodyType>({
        oldPassword: "",
        newPassword: "",
    });
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");

    useEffect(() => {
        setEditProfile({
            name: { firstName: user?.data.name.firstName, lastName: user?.data.name.lastName },
            email: user?.data.email,
        });
        if (user?.success) {
            dispatch(setUser({
                name: { firstName: user.data.name.firstName, lastName: user.data.name.lastName },
                email: user.data.email,
                avatar: user.data.avatar?.url,
                role: user.data.role,
                isActive: user.data.status,
                _id: user.data._id,
            }));
        }
    }, [ user, loadingUser, dispatch ]);


    const handleProfileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditProfile(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    };

    const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewAddress(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    };

    const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPassword(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    };

    const handleProfileEditSubmit = async () => {
        const response = await updateCurrentUserDetailsReqBody.safeParseAsync(editProfile);
        if (!response?.success) return { success: false, message: "Please fill in all the details correctly." };
        try {
            const result = await updateCurrentUserDetails(response.data).unwrap();
            if (!result?.success) return { success: false, message: result.message };
            refetchUser();
            return { success: true, message: result.data?.message || "Profile updated successfully." };
        } catch (error: any) {
            return { success: false, message: error?.data?.message || "Something went wrong, please try again later." };
        }
    };

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

    const handleAddressDelete = async (addressId: string) => {
        try {
            const result = await deleteMyAddress(addressId);
            if (!result?.data?.success) throw new Error(result?.data?.message);
            toast.success(result.data.message);
            refetchAddresses();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || error?.data?.message || "Something went wrong, please try again...");
        }
    };

    const handleUploadAvatar = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const result = await uploadAvatar(formData);
            if (!result?.data?.success) throw new Error(result?.data?.message);
            toast.success(result.data.message);
            refetchUser();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || error?.data?.message || "Something went wrong, please try again...");
        }
    };


    const handlePasswordUpdate = async () => {
        const result = updatePasswordReqBody.safeParse(password);
        if (!result.success) return { success: false, message: "Passwords are incorrect." };
        if (result.data.newPassword !== confirmPassword) return { success: false, message: "Passwords do not match." };
        try {
            const response = await updatePassword(result.data).unwrap();
            setPassword({ newPassword: "", oldPassword: "" });
            setConfirmPassword("");
            return { success: true, message: response.data?.message || "Password updated successfully." };
        } catch (error: any) {
            return { success: false, message: error?.data?.message || "Something went wrong, please try again later." };
        }
    };


    if (loadingUser || loadingOrders || loadingAddresses) return <Loader />;

    return (
        <main>
            <section className={"inner mt-12 flex items-center gap-4"}>
                <div className={"flex flex-col gap-1"}>
                    <Button ref={editProfileButtonRef} className={"!p-2 !rounded-full"}>
                        <PencilIcon />
                    </Button>
                    <Dialog
                        trigger={editProfileButtonRef}
                        heading={"Edit Profile"}
                        submitAction={handleProfileEditSubmit}
                        loading={loadingUploadAvatarMutation}
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
                                    value={editProfile?.name?.firstName}
                                    onChange={handleProfileInputChange}
                                />
                                <Input
                                    name={"name.lastName"}
                                    label={"Last Name"}
                                    placeholder={"Eg. Doe"}
                                    value={editProfile?.name?.lastName}
                                    onChange={handleProfileInputChange}
                                />
                            </div>
                            <Input
                                name={"email"}
                                label={"Email"}
                                placeholder={"Eg. johndoe@example.com"}
                                value={editProfile?.email}
                                onChange={handleProfileInputChange}
                            />
                        </form>
                        <form
                            className={"mt-6 border-t border-slate-200 pt-3"}
                            onChange={handleUploadAvatar}
                        >
                            <h3 className={"text-lg font-bold"}>Change Avatar</h3>
                            <p className={"text-sm text-slate-500 leading-none"}>Upload a new avatar image.</p>
                            <label htmlFor={"avatar"} className={"grid place-items-center cursor-pointer rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 p-5 mt-3"}>
                                <span>Upload Image</span>
                                <input
                                    id={"avatar"}
                                    type={"file"}
                                    accept={"image/*"}
                                    className={"hidden"}
                                    name={"avatar"}
                                    disabled={loadingUploadAvatarMutation}
                                />
                            </label>
                        </form>
                    </Dialog>
                    <Button ref={updatePasswordButtonRef} className={"!p-2 !rounded-full"} variant={"success"}>
                        <LockClosedIcon />
                    </Button>
                    <Dialog
                        trigger={updatePasswordButtonRef}
                        heading={"Update Password"}
                        submitAction={handlePasswordUpdate}
                        submitLabel={"Update"}
                    >
                        <form
                            onSubmit={(event) => event.preventDefault()}
                            className={"grid gap-3"}
                        >
                            <Input
                                name={"oldPassword"}
                                label={"Old Password"}
                                type={"password"}
                                placeholder={"Old Password"}
                                value={password.oldPassword}
                                onChange={handlePasswordInputChange}
                            />
                            <div>
                                <Input
                                    name={"newPassword"}
                                    label={"New Password"}
                                    placeholder={"New Password"}
                                    type={"password"}
                                    value={password.newPassword}
                                    onChange={handlePasswordInputChange}
                                />
                                <Input
                                    name={"confirmNewPassword"}
                                    type={"password"}
                                    placeholder={"Confirm New Password"}
                                    description={"Must be 6 characters or long and must contain at least one alphabet, one number, and one special character."}
                                    className={"mt-1"}
                                    onChange={event => setConfirmPassword(event.currentTarget.value)}
                                />
                            </div>
                        </form>
                    </Dialog>
                </div>
                <Avatar
                    src={user?.data.avatar?.url} fallback={user?.data.name.firstName} size={"huge"}
                    className={"hidden sm:grid"}
                />
                <Avatar
                    src={user?.data.avatar?.url} fallback={user?.data.name.firstName} size={"large"}
                    className={"grid sm:hidden"}
                />
                <div className={"*:leading-tight"}>
                    <p className={"text-base sm:text-lg font-semibold"}>Hello there,</p>
                    <p className={"text-xl sm:text-2xl font-bold"}>{user?.data.name.firstName} {user?.data.name.lastName}</p>
                </div>

            </section>
            <section className={"inner mt-12"}>
                <h2 className={"text-lg sm:text-xl font-bold mb-5"}>Your Orders</h2>
                <ul className={"grid md:grid-cols-2 lg:grid-cols-3 gap-5"}>
                    {!orders?.data?.length
                        ? <p className={"text-center text-slate-500"}>You haven't placed any orders yet.</p>
                        : orders?.data.map((order: any) => (
                            <li key={order._id} className={"relative bg-blue-50 border-blue-100 p-3 sm:p-5 rounded-2xl"}>
                                <h3 className={"sm:text-lg font-semibold"}>Order #{order._id}</h3>
                                <p className={"text-slate-500"}>Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                                <p className={"text-lg mt-2"}>Total: {order.totalAmount}</p>
                                <p className={`text-lg capitalize ${order.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>Status: {order.status}</p>
                                <Button
                                    to={`/account/pay/${order._id}`}
                                    className={"absolute top-3 right-3 !p-2 !rounded-full"}
                                    target={"_blank"}
                                >
                                    <ArrowTopRightOnSquareIcon className={"size-4"} />
                                </Button>
                            </li>
                        ))}
                </ul>
            </section>
            <section className={"inner my-12"}>
                <div className={"flex justify-between sm:justify-start gap-5 mb-5"}>
                    <h2 className={"text-lg sm:text-xl font-bold"}>Your Addresses</h2>
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
                                    onChange={handleAddressInputChange}
                                />
                                <Input
                                    name={"name.lastName"}
                                    label={"Last Name"}
                                    placeholder={"Eg. Doe"}
                                    value={newAddress.name.lastName}
                                    onChange={handleAddressInputChange}
                                />
                            </div>
                            <div className={"grid grid-cols-3 gap-3"}>
                                <SelectInput
                                    name={"countryCode"}
                                    label={"Country Code"}
                                    value={newAddress.countryCode}
                                    onChange={handleAddressInputChange}
                                >
                                    <option value={"91"}>+91</option>
                                </SelectInput>
                                <Input
                                    name={"phoneNumber"}
                                    label={"Phone Number"}
                                    placeholder={"Eg. 9876543210"}
                                    value={newAddress.phoneNumber}
                                    containerClassName={"col-span-2"}
                                    onChange={handleAddressInputChange}
                                    type={"number"}
                                    description={"Must be a 10 digits long number."}
                                />
                            </div>
                            <Input
                                name={"building"}
                                label={"Building"}
                                placeholder={"Eg. 123, Main Street"}
                                value={newAddress.building}
                                onChange={handleAddressInputChange}
                                description={"Must be 10 characters or long."}
                            />
                            <Input
                                name={"street"}
                                label={"Street"}
                                placeholder={"Eg. Main Street"}
                                value={newAddress.street}
                                onChange={handleAddressInputChange}
                                description={"Must be 10 characters or long."}
                            />
                            <div className={"grid grid-cols-2 gap-3"}>
                                <Input
                                    name={"city"}
                                    label={"City"}
                                    placeholder={"Eg. Mumbai"}
                                    value={newAddress.city}
                                    onChange={handleAddressInputChange}
                                    description={"Must be 3 characters or long."}
                                />
                                <Input
                                    name={"state"}
                                    label={"State"}
                                    placeholder={"Eg. Maharashtra"}
                                    value={newAddress.state}
                                    onChange={handleAddressInputChange}
                                    description={"Must be 3 characters or long."}
                                />
                            </div>
                            <div className={"grid grid-cols-2 gap-3"}>
                                <Input
                                    name={"pinCode"}
                                    label={"Pin Code"}
                                    placeholder={"Eg. 400001"}
                                    value={newAddress.pinCode}
                                    onChange={handleAddressInputChange}
                                    description={"Must be 6 characters or long."}
                                />
                                <SelectInput
                                    name={"country"}
                                    label={"Country"}
                                    value={newAddress.country}
                                    onChange={handleAddressInputChange}
                                >
                                    <option value={"India"}>India</option>
                                </SelectInput>
                            </div>
                        </form>
                    </Dialog>
                </div>
                <ul className={"grid md:grid-cols-2 lg:grid-cols-3 gap-5"}>
                    {!addresses?.data?.length
                        ? <p className={"text-center text-slate-500"}>You haven't added any addresses yet.</p>
                        : addresses?.data.map((address: any) => (
                            <li key={address._id} className={"relative bg-blue-50 border-blue-100 p-3 sm:p-5 rounded-2xl"}>
                                <h3 className={"text-lg font-semibold"}>{address.name.firstName} {address.name.lastName}</h3>
                                <address className={"not-italic"}>
                                    <p>+{address.countryCode} {address.phoneNumber}</p>
                                    <p>{address.building}, {address.street}, {address.city}, {address.state}, {address.country} - {address.pinCode}</p>
                                </address>
                                <Button
                                    onClick={() => handleAddressDelete(address._id)}
                                    variant={"destructive"}
                                    className={"absolute top-3 right-3 !p-2 !rounded-full"}
                                    loading={loadingDeleteAddressMutation}
                                >
                                    <TrashIcon className={"size-4"} />
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    );
}