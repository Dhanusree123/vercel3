import axios from 'axios'

export const FETCH_PRODUCTS = `
query findProducts($filter:ProductFilter $limit:Int! $search:BaseSearch $skip:Int! $sort:ProductSort){
    findProducts(filter:$filter, limit:$limit, search:$search, skip:$skip, sort:$sort){
    count
    products{
        id
        active
        brand
        brandId
        categoryId
        categoryPath
        code
        dealPrice
        description
        expired
        handPicked
        id
        images
        landingImage
        listPrice
        mrp
        rating
        reviews
        sales
        slug
        store
        storeId
        title
      }
   }
 }
`
export const FetchProducts = async(limit:number,search:{title:string},skip:number,sort?:{dealPrice:'asc'|"desc"},filter?:{active?:boolean},)=>{
    try{
        const response = await axios({
            url:"https://test-api.nine.deals/graphql",
            method:'post',
            headers:{"Content-Type":"application/json"},
            data:{
                query:FETCH_PRODUCTS,
                variables:{
                    filter,
                    limit,
                    search,
                    skip,
                    sort
                }
            }
        })
        const data = await response.data;
        const products = data.data.findProducts;
        console.log(products)
        return products
    }
    catch(err){
        console.log(err)
    }
}

export const FIND_PRODUCT_BY_ID = `
query findProductById($id:String!){
findProductById(id:$id){
active
brand
brandId
categoryId
categoryPath
code
dealPrice
description
expired
handPicked
id
images
landingImage
listPrice
mrp
rating
reviews
priceHistory{
    date
    dealPrice
    listPrice
    mrp
}
slug
sales
store
storeId
title
}
}`;

export const CREATE_PRODUCT = `
mutation createProduct($input:CreateProductDto!){
createProduct(input:$input){
active
brand
brandId
categoryId
categoryPath
code
createdAt
dealPrice
description
expired
handPicked
id
images
landingImage
listPrice
mrp
priceHistory{
    date
    dealPrice
    listPrice
    mrp
}
rating
reviews
sales
slug
store
storeId
title
updatedAt
}
}
`

export const UPDATE_PRODUCT = `
mutation updateProduct($id:String! $input:UpdateProductDto!){
    updateProduct(id:$id,input:$input){
        id
        title
        images
        mrp
        dealPrice
        listPrice
        handPicked
        expired
    }
}
`

