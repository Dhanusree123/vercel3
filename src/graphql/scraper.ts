export const SCRAPER = `
query scraper($url:String!){ 
  scraper(url:$url){
    brand
    code
    dealPrice
    description
    images
    listPrice
    mrp
    rating
    reviews
    title
  }
}`;