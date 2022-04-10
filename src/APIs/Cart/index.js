import { client } from '..'

export const getCarts = () => {
    return client.fetch(`*[_type == "bill"]{
        _id,
        billStatus -> {
            _id,
            name
        },
        user -> {
            _id,
            fullName
        }
    }`,{
        
    })
}

export const getCartByIdWithStatus = (id) => {
    return client.fetch(`*[_type == 'bill' && billStatus._ref == "ac26c381-8d20-4077-831f-215239cdf61a" && user._ref == "${id}"]{
        _id
    }`)
}

export const getCartDetail = (billId) => {
    return client.fetch(`*[_type == 'bill-detail' && bill._ref == "${billId}" ]{
        _id,
        quantity,
        price,
        product -> {
            _id,
            name,
            image{
                asset->{
                    _id,
                    url
                }
            },
        }
    }`)
}