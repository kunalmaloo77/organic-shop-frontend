import React from 'react'
import { products } from '../store-data/Allproduct'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export const RelatedProducts = ({ productTitle, productKey }) => {
  const filteredProducts = products.filter(
    (product) => product.title === productTitle && product.key !== productKey
  )
  const shuffledProducts = filteredProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  return (
    <div>
      <div className="pt-10">
        <h1 className="text-4xl font-[Merriweather] font-semibold mb-3">Related Products</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 justify-center">
          {shuffledProducts.map((product) => {
            return (
              <React.Fragment key={product.key}>
                <Link to={`/product/${product.key}`}>
                  <div className="p-2.5">
                    <ProductCard title={product.title} name={product.name} price={product.price} smallimage={product.smallimage} key={product.key} />
                  </div>
                </Link>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
