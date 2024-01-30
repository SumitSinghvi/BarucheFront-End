import React, {useState, useEffect} from 'react'
import { getCategoryByHandle, getProductsByCategoryHandle } from '../../modules/data';
import Hero from '../../modules/product/Hero';
import FilterOptions from '../../modules/product/ProductFilter';
import ProductGrid from '../../modules/product/ProductList';

export default function CategoryLayout() {

    const categoryHandle = location.href.split('category/')[1];
    console.log(categoryHandle)
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
    const [filterOptions, setFilterOptions] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                getCategoryByHandle(categoryHandle).then((data) => {
                    setCategory(data);
                    console.log(data);
                    getProductsByCategoryHandle({id: data.id}).then((Productsdata) => {
                        setProducts(Productsdata);
                        setFilteredProducts(Productsdata);
                        console.log(Productsdata);
                    })
                })
            } catch (error) {
              console.error('Error fetching customer data:', error);
            }
        };
  
        fetchData(); // Call the function when the component mounts
    }, [categoryHandle]);

    const applyFilters = () => {
        let filtered = [...products];

        if (filterOptions.minPrice && filterOptions.maxPrice) {
            filtered = filtered.filter(product =>
                ((product.variants[0].calculated_price)/100) >= filterOptions.minPrice && ((product.variants[0].calculated_price)/100) <= filterOptions.maxPrice
            );
        }

        setFilteredProducts(filtered);
    };

    const handleFilterChange = (name, value) => {
        setFilterOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const hero = [
        { 
          img:"https://images.tailorstore.com/YToyOntzOjU6IndpZHRoIjtzOjQ6IjIwMDAiO3M6NjoiaGVpZ2h0IjtzOjA6IiI7fQ%3D%3D/images/cms/2452774_header_business.jpg",
          title:category?.name,
          description:category?.description,
        },
    ]


    return (
    <div>
      <Hero hero={hero}/>
      <div className='flex mx-10 my-5'>
        <FilterOptions onChange={handleFilterChange} />
        <button className='ml-auto' onClick={applyFilters}>Apply Filters</button>
      </div>
      <ProductGrid products={filteredProducts}/>
    </div>
  )
}
