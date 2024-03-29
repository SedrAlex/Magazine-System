import create from "zustand";
import {persist} from "zustand/middleware";


let appStore = (set) => ({
dopen:true,
rows:[],
setRows:(rows) => set((state) => ({rows:rows})),
updateOpen:(dopen) => set((state) => ({dopen:dopen})),

})
let articleStore = (set) => ({
    dopen:true,
    rows:[],
    setRows:(rows) => set((state) => ({rows:rows})),
    updateOpen:(dopen) => set((state) => ({dopen:dopen})),
    
    })

appStore = persist(appStore,{name:"my_app_store"});
export const useAppStore = create(appStore);

articleStore = persist(articleStore,{name:"my_article_store"});
export const useArticleStore = create(articleStore);