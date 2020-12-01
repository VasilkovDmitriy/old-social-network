import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {BrowserRouter} from "react-router-dom";
import {Layout} from 'antd';
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function App() {
    return <Layout>
        <Header/>
        <Layout>
            <Sidebar/>
            <main>
                Content
            </main>
        </Layout>
    </Layout>
}

function AppWithRouter() {
    return <BrowserRouter>
        <App/>
    </BrowserRouter>
}

export default AppWithRouter;
