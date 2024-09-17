import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_categories_action = async (all = false, condition) => {
    try {
        const refresh = await refresh_access_token();
        if (refresh === 401) return 401;
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/categories`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                all,
                condition
            }),
            cache: "no-cache"
        });

        if (response === 401) return 401;

        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        }
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Categories get action failed!"
        }
    }
}