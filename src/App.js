import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/reset.css';
import Feed from './pages/Feed/Feed';
import LoginMain from './pages/Login/LoginMain/LoginMain';
import MyProfile from './pages/Profile/MyProfile/MyProfile';
import ChatList from './pages/Chat/ChatList/ChatList';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />}></Route>
          <Route path="/login" element={<LoginMain />}></Route>
          <Route path="/profile" element={<MyProfile />}></Route>
          <Route path="/chat" element={<ChatList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
