import { redirect } from "next/navigation";

export default function SearchHomesPage({ searchParams }) {
    const searchPrs = searchParams;
    if (Object.keys(searchPrs)?.length === 0) redirect("/");

    const { country, check_in, check_out, guests, bedrooms, beds, bathrooms } = searchPrs;
    
    // Call api

    return (
        <div>page</div>
    )
}
