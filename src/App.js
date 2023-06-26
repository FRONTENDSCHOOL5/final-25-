import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/reset.css';
import LoginMain from './pages/Login/LoginMain/LoginMain';
import Feed from './pages/Feed/Feed';
import SearchUser from './pages/SearchUser/SearchUser.jsx';
import Join from './pages/Join/JoinEmail/JoinEmail';
import JoinProfileSetting from './pages/Join/JoinProfileSetting/JoinProfileSetting';
import MyProfile from './pages/Profile/MyProfile/MyProfile';
import Followers from './pages/Profile/Followers';
import Followings from './pages/Profile/Followings';
import ProfileModification from './pages/ProfileModification/ProfileModification';
import AddProduct from './pages/Product/AddProduct';
import ProductModi from './pages/Product/ProductModi';
import YourProfile from './pages/Profile/YourProfile';
import PostDetail from './pages/Post/PostDetail';
import Upload from './pages/Upload/Upload';
import ChatRoom from './pages/Chat/ChatRoom/ChatRoom';
import ChatList from './pages/Chat/ChatList/ChatList';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginMain />} />
          <Route path="/join">
            <Route index element={<Join />} />
            <Route path="profile" element={<JoinProfileSetting />} />
          </Route>
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<SearchUser />} />
          <Route path="/profile">
            <Route index element={<MyProfile />} />
            <Route path="m" element={<ProfileModification />} />
            <Route path=":accountname" element={<YourProfile />} />
          </Route>
          <Route path="followers/:accountname" element={<Followers />} />
          <Route path="followings/:accountname" element={<Followings />} />
          <Route path="/product">
            <Route index element={<AddProduct />} />
            <Route path="m" element={<ProductModi />} />
          </Route>
          <Route path="/post/:postid" element={<PostDetail />} />
          <Route path="/post/upload" element={<Upload />} />
          <Route path="/chat">
            <Route index element={<ChatList />} />
            {/* 변경 예정:  chat/{id} */}
            <Route path=":accountname" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
