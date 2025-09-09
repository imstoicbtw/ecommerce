import { ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline/index";
import { Bars2Icon, ShoppingBagIcon, Squares2X2Icon, XMarkIcon, UserIcon, ArchiveBoxIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid/index";
import { type Dispatch, type FormEvent, type SetStateAction, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { Store } from "../../redux/store.ts";
import Avatar from "../Avatar/index.tsx";
import { Button } from "../Button.tsx";
import { Input } from "../Input.tsx";
import type { ICategoryRawDoc } from "../../../../common/dist/mongoose/category.types";


type Props = {
    handleSearch: (event: FormEvent<HTMLFormElement>) => void;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    categories: any;
    loadingCategories: boolean;
    user: Store["user"]["details"];
    cartCount: number;
    handleLogout: () => Promise<void>;
}

export default function MobileHeader ({ search, setSearch, handleSearch, categories, loadingCategories, user, cartCount, handleLogout }: Props) {

    const location = useLocation();

    const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);

    useEffect(() => handleCloseMenu(), [ location ]);

    const handleOpenMenu = (): void => {
        setIsMenuOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleCloseMenu = (): void => {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
    };

    return (
        <section className={"lg:hidden inner border-b-2 border-slate-200 pb-3 pt-5"}>
            <div className={"mb-3 flex gap-10 items-center justify-between"}>
                <Link to={"/"}>
                    <h1 className={"flex gap-1 items-center text-xl font-black justify-center leading-0 text-blue-600"}>
                        <BuildingStorefrontIcon className={"size-5"} />
                        <span>APLAMART</span>
                    </h1>
                </Link>
                <nav>
                    <ul className={"flex gap-2 items-center"}>
                        <li>
                            <Link to="/cart" className={"relative grid place-items-center w-10 h-10 rounded-full text-slate-700 hover:text-blue-600 hover:bg-blue-100 border-2 border-slate-300 hover:border-blue-500"}>
                                <ShoppingBagIcon className={"size-5"} />
                                <span className={"absolute -top-1 -left-2 grid place-items-center leading-0 rounded-full text-xs text-white bg-blue-500 w-5 h-5 pt-0.5"}>{cartCount || 0}</span>
                            </Link>
                        </li>
                        <li>
                            <Button
                                variant={"plain"}
                                size={"large"}
                                className={""}
                                onClick={handleOpenMenu}
                            >
                                <Bars2Icon className={"!size-6"} />
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <form
                className={"grow flex gap-1"}
                onSubmit={handleSearch}
            >
                <Input
                    name={"search"}
                    placeholder={"Search products..."}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <Button><MagnifyingGlassIcon /></Button>
            </form>
            <div
                className={"fixed h-screen w-screen bg-black/50 top-0 flex justify-end backdrop-blur-xl z-[10000] before:absolute before:inset-0 before:-z-1"}
                style={{ right: isMenuOpen ? 0 : "-100%", transition: "right 0.2s ease" }}
            >
                <div className={"relative max-w-xs w-full flex flex-col gap-5 p-6 bg-white overflow-scroll"}>
                    <div className={"flex justify-between items-center text-xl font-bold"}>
                        <p>Menu</p>
                        <button onClick={handleCloseMenu} className={"cursor-pointer"}>
                            <XMarkIcon className={"size-6"} />
                        </button>
                    </div>
                    {user && <div>
                        <div className={"flex gap-2 items-center"}>
                            <Avatar fallback={user?.name.firstName} src={user?.avatar} />
                            <div className={"*:leading-tight"}>
                                <p className={"text-lg font-semibold"}>{user?.name.firstName} {user?.name.lastName}</p>
                                <p className={"text-sm"}>{user?.email}</p>
                            </div>
                        </div>
                        <ul className={"flex flex-col gap-2 mt-3"}>
                            {user?.role === "admin" && <li>
                                <NavLink className={({ isActive }) => `flex gap-2 items-center text-lg font-medium leading-tight w-full ${isActive && "text-blue-600"}`} to={"/dashboard/home"}>
                                    <Squares2X2Icon className={"size-4"} />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>}
                            <li>
                                <NavLink className={({ isActive }) => `flex gap-2 items-center text-lg font-medium leading-tight w-full ${isActive && "text-blue-600"}`} to={"/account/profile"}>
                                    <UserIcon className={"size-4"} />
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => `flex gap-2 items-center text-lg font-medium leading-tight w-full ${isActive && "text-blue-600"}`} to={"/account/profile"}>
                                    <ArchiveBoxIcon className={"size-4"} />
                                    <span>My Orders</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>}
                    <div>
                        <p className={"text-lg font-semibold"}>Categories</p>
                        <div className={"flex flex-col gap-2 mt-2"}>
                            {loadingCategories ? (
                                <div>Loading...</div>
                            ) : categories?.data.map((category: ICategoryRawDoc & { count: number }) => (
                                <NavLink
                                    to={`/product-category/${category.slug}`}
                                    className={({ isActive }) => `flex gap-2 items-center justify-between rounded-md leading-tight w-full ${isActive && "text-blue-600"}`}
                                    key={"category_list_item_" + category.slug}
                                >
                                    <span>{category.name}</span>
                                    <span className={"text-sm text-white grid place-items-center min-w-5 max-w-xs h-5 bg-blue-500 rounded-full leading-0"}>{category.count}</span>
                                </NavLink>
                            ))
                            }
                        </div>
                    </div>
                    <div className={"absolute bottom-0 left-0 w-full grid grid-cols-2 gap-3 p-3 border-t-2 border-slate-200"}>
                        {user
                            ? <Button
                                variant={"destructive"}
                                onClick={handleLogout}
                                className={"col-span-2"}
                                icon={ArrowLeftStartOnRectangleIcon}
                            >Logout</Button>
                            : <>
                                <Button icon={UserPlusIcon} to={"/auth/register"}>Register</Button>
                                <Button icon={ArrowRightEndOnRectangleIcon} variant={"secondary"} to={"/auth/login"}>Login</Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}