import { HomeIcon } from "@heroicons/react/16/solid";
import { ArrowRightEndOnRectangleIcon, ChevronDownIcon, UserPlusIcon, MagnifyingGlassIcon, UserIcon, QuestionMarkCircleIcon, ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline/index";
import { useSelector, useDispatch } from "react-redux";
import { ClockIcon, ShoppingBagIcon } from "@heroicons/react/24/solid/index";
import type { ICategoryRawDoc } from "common/dist/mongoose/category.types.ts";
import { type FormEvent, type ForwardRefExoticComponent, type PropsWithoutRef, type SVGProps, useRef, useState } from "react";
import { Link, type To, useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { useLogoutMutation } from "../../redux/query/authApiSlice.ts";
import { useGetCategoriesQuery } from "../../redux/query/categoriesApiSlice.ts";
import type { CartItem } from "../../redux/slices/cartSlice.ts";
import { clearUser } from "../../redux/slices/userSlice.ts";
import type { Store } from "../../redux/store.ts";
import Avatar from "../Avatar/index.tsx";
import { Button } from "../Button.tsx";
import FloatingMenu from "../FloatingMenu.tsx";
import { Input } from "../Input.tsx";


const userActionsMenuItems: {
    label: string;
    to: To;
    Icon: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
}[] = [
    { label: "Profile", to: "/account/profile", Icon: UserIcon },
    { label: "My Orders", to: "/account/orders", Icon: ArchiveBoxIcon },
    { label: "Help", to: "/account/help", Icon: QuestionMarkCircleIcon },
];


export default function Header () {

    const dispatch = useDispatch();
    const user = useSelector((state: Store) => state.user.details);

    const navigate = useNavigate();
    const { currentData: categories, isLoading: loadingCategories } = useGetCategoriesQuery(null);
    const [ logout ] = useLogoutMutation();

    const cartCount = useSelector((state: any) => state.cart.items?.reduce((acc: number, item: CartItem) => acc + item.quantity, 0));
    const [ search, setSearch ] = useState<string>("");
    const categoriesTriggerRef = useRef<HTMLButtonElement>(null);
    const userMenuTriggerRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search/?keyword=${search}`);
    };

    const handleLogout = async () => {
        try {
            await logout(null).unwrap();
            navigate("/auth/login");
        } catch (error: any) {
            toast.error(error.data.message);
        } finally {
            dispatch(clearUser());
        }
    };

    return (
        <header className={"sticky top-0 z-[9995] bg-white"}>
            <section className={"inner min-h-15 flex gap-10 items-center border-b-2 border-slate-200"}>
                <Link to={"/"}>
                    <h1 className={"flex gap-1 items-center text-xl font-black justify-center leading-0 text-blue-600"}>
                        <ClockIcon className={"size-5"} />
                        <span>SHOPHOUR</span>
                    </h1>
                </Link>
                <form
                    className={"grow flex gap-1 items-center"}
                    onSubmit={handleSearch}
                >
                    <Input
                        name={"search"}
                        placeholder={"Search products..."}
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                    />
                    <Button icon={MagnifyingGlassIcon}>Search</Button>
                </form>
                <nav>
                    <ul className={"flex gap-2 items-center"}>
                        <li>
                            <Button
                                variant={"plain"}
                                icon={ChevronDownIcon}
                                ref={categoriesTriggerRef}
                                className={"relative"}
                            >
                                <span>Categories</span>
                                <FloatingMenu
                                    float={"bottom-right"}
                                    trigger={categoriesTriggerRef}
                                    className={"flex flex-col text-slate-700 mt-2"}
                                >
                                    {loadingCategories ? (
                                        <div>Loading...</div>
                                    ) : categories?.data.map((category: ICategoryRawDoc & { count: number }) => (
                                        <Link
                                            to={`/product-category/${category.slug}`}
                                            className={"flex gap-2 items-center justify-between p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 text-left leading-tight w-full text-nowrap"}
                                            key={"category_list_item_" + category.slug}
                                        >
                                            <span>{category.name}</span>
                                            <span className={"text-sm text-white grid place-items-center min-w-5 max-w-xs h-5 bg-blue-500 rounded-full leading-0"}>{category.count}</span>
                                        </Link>
                                    ))
                                    }
                                </FloatingMenu>
                            </Button>
                        </li>
                        {user?.role === "admin" && (
                            <li className={"mr-1"}>
                                <Button
                                    variant={"success"}
                                    to={"/dashboard/home"}
                                    icon={HomeIcon}
                                    className={"text-white"}
                                    onClick={() => toast.success("Welcome to the admin dashboard!")}
                                >Dashboard</Button>
                            </li>
                        )}
                        <li>
                            <Link to="/cart" className={"relative grid place-items-center w-10 h-10 rounded-full text-slate-700 hover:text-blue-600 hover:bg-blue-100 border-2 border-slate-300 hover:border-blue-500"}>
                                <ShoppingBagIcon className={"size-5"} />
                                <span className={"absolute -top-1 -left-2 grid place-items-center leading-0 rounded-full text-xs text-white bg-blue-500 w-5 h-5 pt-0.5"}>{cartCount || 0}</span>
                            </Link>
                        </li>

                        <li className={"flex gap-2 items-center"}>
                            {user ? (
                                <div
                                    className={"relative"}
                                    ref={userMenuTriggerRef}
                                >
                                    <Avatar className={"cursor-pointer"} fallback={user.name.firstName} />
                                    <FloatingMenu
                                        float={"bottom-right"}
                                        trigger={userMenuTriggerRef}
                                        className={"mt-4 flex flex-col gap-1 *:flex *:gap-2 *:items-center *:p-2 *:rounded-md *:cursor-pointer"}
                                    >
                                        {userActionsMenuItems.map(({ label, to, Icon }) => (
                                            <Link key={"admin_actions_menu_to_" + to} to={to} className={"hover:bg-blue-100 hover:text-blue-600"}>
                                                <Icon className={"size-5"} />
                                                <span>{label}</span>
                                            </Link>
                                        ))}
                                        <div className={"text-red-500 hover:bg-red-100 hover:text-red-600"} onClick={handleLogout}>
                                            <ArrowLeftStartOnRectangleIcon className={"size-5 rotate-180"} />
                                            Logout
                                        </div>
                                    </FloatingMenu>
                                </div>
                            ) : (
                                <>
                                    <Button icon={UserPlusIcon} to={"/auth/register"}>Register</Button>
                                    <Button icon={ArrowRightEndOnRectangleIcon} variant={"secondary"} to={"/auth/login"}>Login</Button>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    )
        ;
}