import { client } from ".."

export const getAllProduct = (category) => {
    return client.fetch(`*[_type == "product" && categoryProduct._ref=="${category}"]{
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
    }`,{

    })
}

export const getProductHome = () => {
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
    }`,{

    })
}

export const getSingleProduct = (id) => {
    return client.fetch(`*[_type == "product" && _id == "${id}"]{
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
    }`,{

    })
}