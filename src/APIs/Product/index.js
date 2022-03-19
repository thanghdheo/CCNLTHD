import { client } from ".."

export const getAllProduct = () => {
    return client.fetch(`*[_type == "product"]{
        _id,
        description,
        name,
        price,
        quantiy,
        slug,
        image{
            asset->{
                _id,
                url
            }
        },
        categoryProduct->{
            _id,
            name
        }
    }`)
}