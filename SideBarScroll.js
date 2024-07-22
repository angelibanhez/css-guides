// pages/index.js
import React, { useState } from 'react';
import Header from '../components/Header';
import styled, { createGlobalStyle } from 'styled-components';

export default function Home() {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  const handleLeftAddClick = () => {
    setLeftItems([...leftItems, `Item ${leftItems.length + 1}`]);
  };

  const handleRightAddClick = () => {
    setRightItems([...rightItems, `Item ${rightItems.length + 1}`]);
  };

  return (
    <Container>
      <GlobalStyle />
      <Header />
      <Main>
        <Sidebar>
          <SidebarFixed>
            <SidebarTitle>Sidebar Title 1</SidebarTitle>
            <SidebarTitle>Sidebar Title 2</SidebarTitle>
            <Rectangle>
              <Button onClick={handleLeftAddClick}>Add</Button>
            </Rectangle>
          </SidebarFixed>
          <ScrollableContainer>
            {leftItems.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </ScrollableContainer>
        </Sidebar>
        <Content>
          <SectionTitle>Main Content</SectionTitle>
          <Paragraph>Welcome to the Scrollables project! Here you can learn about different types of scrollable elements.</Paragraph>
        </Content>
        <Sidebar>
          <SidebarFixed>
            <SidebarTitle>Sidebar Title 1</SidebarTitle>
            <SidebarTitle>Sidebar Title 2</SidebarTitle>
            <Rectangle>
              <Button onClick={handleRightAddClick}>Add</Button>
            </Rectangle>
          </SidebarFixed>
          <ScrollableContainer>
            {rightItems.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </ScrollableContainer>
        </Sidebar>
      </Main>
    </Container>
  );
}

const GlobalStyle = createGlobalStyle`
  body, html {
    overflow: hidden;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ecf0f1;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  padding: 20px;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  flex: 1;
  background-color: #34495e;
  padding: 20px;
  border-radius: 8px;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const SidebarFixed = styled.div`
  position: sticky;
  top: 0;
  background-color: #34495e;
  z-index: 10;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  margin-top: 20px;
`;

const Content = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const SidebarTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
`;

const Rectangle = styled.div`
  background-color: #ecf0f1;
  height: 200px;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`;

const Item = styled.div`
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
