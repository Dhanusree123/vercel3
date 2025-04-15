import axios from "axios";

export const FIND_BRANDS = `
query findBrands{ 
  findBrands{
    brands{
      id
      title
    }
  }
}`;

export const FetchBrands= async(
) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: FIND_BRANDS
      },
    });
    const data = await response.data;
    const brands = data.data.findBrands;
    return brands;
    
  } catch (err) {
    console.error(err);
  }
};

export const FETCH_BRANDS = `
query findBrands($search:BaseSearch){
  findBrands(search:$search,){
    brands{
      active
      createdAt
      id
      imageUrl
      metadata{
        content
        description
        keywords
        title
      }
      title
    }
  }
}
`