import Navbar from "./Navbar";
import { get_categories_public_action } from "@/actions/public/category";

export default async function NavbarServer() {
    const categories = await get_categories_public_action() || {};

    return (
        <Navbar categories={categories} />
    )
}
