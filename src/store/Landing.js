import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Select, Row, Col, Layout, Modal, Button } from "antd";
import styles from "./Landing.css";
import HeaderArea from './HeaderArea';
import { observer } from 'mobx-react';
import axios from 'axios';
import ProductStore from './store';

const { Header, Sider, Content } = Layout;
const Option = Select.Option;

// component to display all products
@observer
class Product extends Component {
    state = { visible: false }

    //function to open pop-up
    showModal = () => {
        ProductStore.size = this.props.product.sizes.split(",");
        this.setState({
            visible: true,
        });
       
    }

    //function to add product to cart
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        if(ProductStore.SelectedProduct.length < 5){
        ProductStore.SelectedProduct.push(this.props.product);
        }
        else {
            Modal.error({
                title: 'Cart full',
                content: 'You can order maximum 5 items at one time',
        })
    }
    }

    //function to close pop-up
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
       
        this.singleProduct = <fieldset style={{ width: 430 + 'px' }}>
            <Row>
                <Col span={12}>
                    <img src={this.props.product.productimage} alt="" width="190px" height="150px" />
                </Col>
                <Col span={12}>
                    <h3>{this.props.product.name}</h3>
                    <h4>Rs. {this.props.product.price}</h4>
                    <h4>Brand: {this.props.product.brand}</h4>
                    <h5>Size: {this.props.product.sizes}</h5>
                    <Button onClick={this.showModal} >Buy now</Button>
                </Col>
            </Row>
        </fieldset>
        return [
            this.singleProduct,
            <Modal
                title={this.props.product.name}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="Buy"
            >
                <Row>
                    <Col span={24}>
                        <img src={this.props.product.productimage} alt="" width="480px" height="300px" />
                    </Col>
                    <Col span={24} style={{marginTop:20+'px'}}>
                        <Row>
                            <Col span={8} offset={2}>
                                <Input type="number" placeholder="Quantity" />
                            </Col>
                            <Col span={8} offset={4}>
                                <Select placeholder="Select size" style={{ width: 150+'px'}}>
                                 {  ProductStore.size.slice().map((value,index) => (
                                      <Option value={value}>{value}</Option>  
                                 ))
                                  }
                                   
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        ]
    }
}

// component for items in cart
@observer
class selectedProduct extends Component {
    
    render() {
        this.Product = <fieldset style={{ width: 200 + 'px' }}>
            <Row>
                <Col span={24}>
                    <img src={this.props.product.productimage} alt="" width="190px" height="150px"/>
                    <h3>{this.props.product.name}</h3>
                    <h4>Rs. {this.props.product.price}</h4>
                    <Button>Remove</Button>
                </Col>
            </Row>
        </fieldset>
        return [
            this.Product
        ]
    }
}

// main page component
@observer
class LandingPage extends Component {
    componentWillMount() {
        axios
            .get(`http://images.stockal.com/api/products.json`)
            .then(resp => {
                if (resp.status === 200) {
                    resp.data.data.products.map((value, index) => {
                        ProductStore.Product.push({
                            name: value.productName,
                            price: value.price,
                            brand: value.brand,
                            sizes: value.sizes,
                            productimage: value.searchImage
                        })
                    })
                }
                else {
                    Modal.error({
                        title: 'Error!',
                        content: resp.message,
                    });
                }
            });
    }
    render() {
        return [
            <Layout className="dashboardLayout">
                <Header className="fixed-header-content">
                    <HeaderArea />
                </Header>
                <Layout className="main-content">
                    <Content className="fixed-map-content">
                        {ProductStore.SelectedProduct.length !== 0?(<div style={{borderBottom: "1px solid grey"}}>
                            <h3 style={{textAlign:'center'}}>Ordered Product List</h3>
                            {ProductStore.SelectedProduct.slice().map((product, index) => (
                            <selectedProduct product={product} index={index} ></selectedProduct>
                        ))}
                        </div>):''}
                        {ProductStore.Product.slice().map((product, index) => (
                            <Product product={product} index={index} ></Product>
                        ))}
                    </Content>
                </Layout>
            </Layout>,
        ]
    }
}
export default LandingPage;