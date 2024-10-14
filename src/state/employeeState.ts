import { atom, selector } from "recoil";
import { Employee } from "../models/employee";

export const employeeState=atom<Employee[]>({
    key:"employeeState",
    default:[
        {
            id: 0,
            name: 'khaleel Ahmed',
            position: 'Technical Lead',
          },
    ]
})

export const searchTermState = atom<string>({
    key: 'searchTermState',
    default: '',
  });

  export const viewState = atom({
    key: "viewState",
    default: "column",
  });

  export const productFilteredState = atom({
    key: "productFilteredState",
    default: "All",
  });

  export const filteredEmployees = selector({
    key: "filteredEmployees",
    get: ({ get }) => {
      const employees = get(employeeState);
      const searchText = get(searchTermState);
      const filterItem = get(productFilteredState);
      let filteredEmployees = [];
      filteredEmployees = employees
        .filter((product) => product.name.includes(searchText))
        .filter((product) =>
          filterItem == "" ? true : product.position == filterItem
        );
  
      return filteredEmployees;
    },
  });