import { useMemo } from "react"

const getPageCount = (totalCount, limit) =>{
    return Math.ceil(totalCount / limit);
}


  //ДЗ: Использовать useMemo чтобы массив не пересчитывался на каждом рендере а пересчитывался только тогда, когда изменилось общее количество страниц
const getPagesArray = (totalPages) => {
    const result = [];
    for (let i = 0;i < totalPages; i++){
        result.push(i + 1);
    }
    return result;
}
export const usePagination = () =>{
    
}