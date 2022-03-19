import { client } from ".."

export const getListCategory = async () => {
    return await client.fetch('*[_type == "categoryProduct"]')
}