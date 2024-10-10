export const standardizeSubrows = (data:any, subrowKeys:any) => {
    return data.map((item:any )=> {
        const subRows = subrowKeys?.map((key:any) => item[key] || []).flat(); // Alt satırları al
        return {
            ...item,
            subRows: subRows ? subRows.map((sub:any) => ({ original: sub })) : [], // Her bir alt satırı nesneye çevir
        };
    });
};
