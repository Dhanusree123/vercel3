export const FETCH_POSTS = `
query findPosts($filter:PostFilter $limit:Int $search:BaseSearch $skip:Int! $sort:BaseSort){
    findPosts(filter:$filter, limit:$limt, search:$search, skip:$skip, sort:$sort){
        count
        posts{
            active
            authors
            categories
            content
            createdAt
            createdBy
            featuredImage
            id
            isPublished
            oldSlugs
            slug
            tags
            title
            updatedBy
            updatedAt
        }
    }
}
`