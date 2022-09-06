import React, { useEffect, useState } from 'react';
import '../styles/filter.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Filter() {
  const [ allProducts, setAllProducts] = useState([]);
  const [ selectedCategory, setSelectedCategory] = useState([]);
  const [ selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [ categoryData, setCategoryData] = useState([]);
  const [ subcategoryData, setSubcategoryData] = useState([]);
  const [ typedText, setTypedText] = useState('');
  const [ searchText, setSearchText] = useState('');
  const [ loading, setLoading] = useState(true);

  const users = useSelector((state) => state.user);
  const { token, } = users;

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, searchText])

  const fetchProducts = async () => {
    try {
      const products = await axios.get(`http://localhost:8080/api/v1/auth/products?category_id=${selectedCategory}&subcategories_id=${selectedSubcategory}&product_name=${searchText}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      setAllProducts(products.data.data);
    }catch(e) {
      console.log('!!!!Error!!!!!!!!!', e)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategoryData = async () => {
   try{
    const category = await axios.get("http://localhost:8080/api/v1/auth/categorys",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },}
    );
    setCategoryData(category.data.data);
   }catch(e) {
    console.log('!!!!Error!!!!!!!!!', e)
   }
  };

  // selected category
  // sub category data fetch
  const productCategoryHandler = async (categoryId) => {
    const subCategory = await axios.get(`http://localhost:8080/api/v1/auth/subcategories?category_id=${categoryId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
    setSubcategoryData(subCategory.data);
    setSelectedCategory(categoryId)
  }

  const productSubCategoryHandler = async (subCategory) => {
    setSelectedSubcategory(subCategory)
  }

  const searchhandler = () => {
    setSearchText(typedText);
  }

  return (
    <>
      <Container>
        <Row>
          <div class="dropdown">
            <Col lg='6' md='12'>
              <div className='dropdown_btns'>
                <div className='category_dropdown'>
                  <select onChange={(event) => productCategoryHandler(event.target.value)}>
                    <option className='category_options'>Select Category</option>
                    {
                      categoryData && categoryData.map((categoryItem) => (
                        <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.category_name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className='subcategory_dropdown'>
                  <select onChange={(event) => productSubCategoryHandler(event.target.value)}>  
                    <option>Select Subcategory</option>
                    {
                      subcategoryData && subcategoryData.map((subcategory) =>(
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.subcategories_name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className='searchbar'>
                <input type='text' placeholder='Search products here'
                onChange={(e) => setTypedText(e.target.value)}
                />
                <button type="button" class="btn btn-primary"
                  onClick={searchhandler}
                >Search</button>
              </div>
            </Col>
          </div>
        </Row>
        

        <div>
          { loading &&  <h3 style={{textAlign: 'center', marginTop: '80px', color: 'green'}}>Loading...</h3>}
          <Row>
            {
              allProducts && allProducts.map((product) => (
                <Col lg='3' md='6' sm='12'>
                  <div key={product.id} className='product_card'>
                    <Link to={`/productdetail/${product.id}`}>
                      <img src={product.product_image} alt='Not found'/>
                    </Link>
                    
                    <div className='product_detail'>
                      <h4 className='title'>{product.product_name}</h4>
                      <p>{product.product_description}</p>
                    </div>
                    
                    <div className='price_product'>
                      <span>&#8377; {product.product_price}</span>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </div>
      </Container>
    </>
  )
}
