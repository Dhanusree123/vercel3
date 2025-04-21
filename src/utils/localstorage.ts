import { IPageLayout } from "../types/page-layout"

export const getPageLayoutsFromLocal = ():Record<string,IPageLayout> => {
    const data = JSON.parse(localStorage.getItem("pagelayouts")|| "{}")
    return data;
}

export const setPageLayoutsToLocal = (data:Record<string,IPageLayout>) => {
    localStorage.setItem("pagelayouts",JSON.stringify(data))
}