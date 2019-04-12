import { observable } from "mobx";
import React, { Component } from "react";

class ProductStore {
@observable Product = [];
@observable SelectedProduct = [];
@observable size = [];
}
export default new ProductStore();