import React from 'react';

function FilterOptions({ onChange }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div>
            <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                onChange={handleInputChange}
            />
            {/* Add more filter inputs as needed */}
        </div>
    );
}

export default FilterOptions;
