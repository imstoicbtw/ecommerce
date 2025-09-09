import { useSelector, useDispatch } from "react-redux";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { useLogoutMutation } from "../../redux/query/authApiSlice.ts";
import { useGetCategoriesQuery } from "../../redux/query/categoriesApiSlice.ts";
import type { CartItem } from "../../redux/slices/cartSlice.ts";
import { clearUser } from "../../redux/slices/userSlice.ts";
import type { Store } from "../../redux/store.ts";
import DesktopHeader from "./DesktopHeader.tsx";
import MobileHeader from "./MobileHeader.tsx";


export default function Header () {

    const dispatch = useDispatch();
    const user = useSelector((state: Store) => state.user.details);

    const navigate = useNavigate();
    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery(null);
    const [ logout ] = useLogoutMutation();

    const cartCount = useSelector((state: any) => state.cart.items?.reduce((acc: number, item: CartItem) => acc + item.quantity, 0));
    const [ search, setSearch ] = useState<string>("");

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
            <DesktopHeader
                user={user}
                cartCount={cartCount}
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
                categories={categories}
                loadingCategories={loadingCategories}
                handleLogout={handleLogout}
            />
            <MobileHeader
                user={user}
                cartCount={cartCount}
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
                categories={categories}
                loadingCategories={loadingCategories}
                handleLogout={handleLogout}
            />
        </header>
    );
}