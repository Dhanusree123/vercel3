import axios from "axios";

export const FIND_STORES = `
query findStores{
  findStores{
    stores{
      id
      title
    }
  }
}`;

export const FetchStores = async () => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: FIND_STORES,
      },
    });
    const data = await response.data;
    const stores = data.data.findStores;
    return stores;
  } catch (err) {
    console.error(err);
  }
};

export const FETCH_STORES = `
query findStores( $search:BaseSearch){
  findStores(search:$search,){
    count
    stores{
      active
      id
      title
    }
  }
}
`