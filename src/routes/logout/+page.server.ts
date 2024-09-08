
export async function load({ request, cookies }) {
    cookies.delete("jwt", {path: "/"})
}