import React from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Banner from '../Components/Banner'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'
import ProductList from '../Components/ProductList'

function Home() {
  return (
    <Container>
        <Banner />
        <Categories />
        <Announcement />
        <ProductList />
        <Announcement />
        <Footer/>
    </Container>
  )
}

export default Home

const Container = styled.div`
    overflow-x: hidden;
`