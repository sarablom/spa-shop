import { Product } from "../../models/Product";
import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import { Search } from "react-feather";

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
    <FormWrapper>
      <label htmlFor="header-search">
        <VisuallyHidden>Sök bland produkter...</VisuallyHidden>
      </label>
      <Search style={{marginLeft: "1rem", marginTop: "1.5rem", position: "absolute"}} size="1.5em" />
      <InputField
        type="text"
        id="header-search"
        placeholder="Sök bland produkter..."
        onChange={(e) => filterProducts(e.target.value)}
      />
    </FormWrapper>
  );
}

const FormWrapper = styled.form `
  position: relative;
  color: ${COLORS.darkGreen};
`

const InputField = styled.input`
  height: 40px;
  width: 32rem;
  max-width: 80%;
  margin: 1rem;
  margin-left: 3rem;
  background: ${COLORS.lightGreen};
  border: none;
  border-bottom: 2px solid ${COLORS.darkGreen};

  &:focus {
    outline: 1px solid ${COLORS.darkGreen};
  }
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
