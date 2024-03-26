'use client';
import React from 'react';
import { Layout } from 'antd';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { Content } = Layout;

  return (
    <Layout className="layout">
      <Content
        style={{
          minHeight: '100vh',
          marginTop: '80px',
        }}
        className="container"
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
