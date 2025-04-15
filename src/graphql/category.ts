import axios from "axios";

export const FIND_CATEGORIES = `
query findCategories{
  findCategories{
    categories{
      id
      title
    }
  }
}`;

export const FetchCategories = async(
) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: FIND_CATEGORIES
      },
    });
    const data = await response.data;
    const categories = data.data.findCategories;
    return categories;
    
  } catch (err) {
    console.error(err);
  }
};

export const FETCH_CATEGORIES = `
query findCategories( $search:BaseSearch ){
  findCategories(search:$search){
    count
    categories{
      active
      id
      imageUrl
      path
      title
      metadata{
        content
        description
        keywords
        title
      }
    }
  }
}
`