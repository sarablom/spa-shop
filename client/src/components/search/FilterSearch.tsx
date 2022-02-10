import { useState } from "react";
import { Product } from "../../models/Product";
import styled from "styled-components";

interface Props {
    products: Product[] | [];
    setFilteredProducts: Function;
  }

function FilterSearch({products, setFilteredProducts}: Props) {
  

  function filterProducts (searchString: string) {
    const filtered = products.filter((product) => {
        return (
            product.title.toLowerCase().includes(searchString) ||
            product.description.toLowerCase().includes(searchString) ||
            product.category.toLowerCase().includes(searchString) 
        )  
    })
    setFilteredProducts(filtered as Product[]);
  }

  return (
    <form>
      <label htmlFor="header-search">
        <VisuallyHidden>Sök bland produkter...</VisuallyHidden>
      </label>
      <InputField
        type="text"
        //value={searchString}
        id="header-search"
        placeholder="Sök bland produkter..."
        onChange={(e) => filterProducts(e.target.value)}
      />
      <button type="submit">Sök</button>
    </form>
  );
}

const InputField = styled.input`
  height: 40px;
  margin: 1rem;
`;

const VisuallyHidden = styled.span `
clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

export default FilterSearch;
