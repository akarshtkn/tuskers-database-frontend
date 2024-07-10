import { SelectFieldType } from "./Types";

const createDistrictOptions = (includeAllOption: boolean): SelectFieldType[] => {
    const districts: SelectFieldType[] = [
        {id: 1, value: "ALAPPUZHA"},
        {id: 2, value: "ERNAKULAM"},
        {id: 3, value: "IDUKKI"},
        {id: 4, value: "KANNUR"},
        {id: 5, value: "KASARAGOD"},
        {id: 6, value: "KOLLAM"},
        {id: 7, value: "KOTTAYAM"},
        {id: 8, value: "KOZHIKODE"},
        {id: 9, value: "MALAPPURAM"},
        {id: 10, value: "PALAKKAD"},
        {id: 11, value: "PATHANAMTHITTA"},
        {id: 12, value: "THIRUVANANTHAPURAM"},
        {id: 13, value: "THRISSUR"},
        {id: 14, value: "WAYANAD"},
        {id: 15, value: "OUTSIDE_KERALA"},
        {id: 16, value: "OUTSIDE_INDIA"},
    ];

    if (includeAllOption) {
        districts.unshift({id: 0, value: "ALL"});
    }

    return districts;
};

export const Districts = createDistrictOptions(false);
export const AllDistricts = createDistrictOptions(true);