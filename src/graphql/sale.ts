export const FETCH_SALES = `
query findSales($search:BaseSearch){
  findSales(search:$search){
    count
    results{
      active
      id
      slug
      title
    }
  }
}
`