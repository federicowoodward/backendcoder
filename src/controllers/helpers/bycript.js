import bycript from "bcrypt"
export function comparePassword(password, hash) {
    let compare = bycript.compareSync(password.toString(), hash.toString())
    return compare
}
export async function createPassword(password) {
    let create = await bycript.hash(password.toString(), 8)
    return create
}