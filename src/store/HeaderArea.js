import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Button, Form, Input, Select, Row, Col } from 'antd';
import { observer } from "mobx-react";

@observer
class HeaderArea extends Component {
    render() {
        return (
            <div>
                <div className="top-left">
                    <div className="logo"><img src="./logo.png" height="68" width="auto" alt="" /></div>
                </div>
                <div className="top-middle">
                    <nav>
                        <nav>
                            <a href="#">Man</a> |
                            <a href="#">Woman</a> |
                            <a href="#">Kids</a> |
                            <a href="#">Sports</a>
                        </nav>
                    </nav>
                </div>
                <div className="top-right">
                    <h3>Login</h3>
                </div>
            </div>
        )
    }
}
export default HeaderArea;
