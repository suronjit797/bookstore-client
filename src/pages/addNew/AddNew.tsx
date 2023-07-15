// import React from 'react';

import ProductForm from "../../components/productForm/ProductForm";
import Layout from "../../layouts/Layout";

const AddNew = () => {
  return (
    <Layout>
      <ProductForm mode='create' />
    </Layout>
  );
};

export default AddNew;
