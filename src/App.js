import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/reset.css';
// import LoginMain from './pages/Login/LoginMain/LoginMain';
import Feed from './pages/Feed/Feed';
import SearchUser from './pages/SearchUser/SearchUser.jsx';
import Join from './pages/Join/JoinEmail/JoinEmail';
import JoinProfileSetting from './pages/Join/JoinProfileSetting/JoinProfileSetting';
import MyProfile from './pages/Profile/MyProfile/MyProfile';
import Followers from './pages/Profile/Followers';
import ProfileModification from './pages/ProfileModification/ProfileModification';
import AddProduct from './pages/Product/AddProduct';
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
          <Route path="/" element={<Feed />}></Route>
          <Route path="/search" element={<SearchUser />}></Route>
          {/* <Route path="/login" element={<LoginMain />}></Route> */}
          <Route path="/join">
            <Route index element={<Join />} />
            <Route path="profile" element={<JoinProfileSetting />} />
          </Route>
          <Route path="/profile">
            <Route index element={<MyProfile />} />
            <Route path="m" element={<ProfileModification />} />
            <Route path="product/followers" element={<Followers />} />
            <Route path="product/add" element={<AddProduct />} />
            {/* AddProduct와 ProductModi 페이지 분리 필요! 또는 공통된 이름으로 파일명을 바꾸고, 안에서 조건에 따라 렌더링 되도록 하는 등의 분리가 필요함 */}
            <Route path="product/m" element={<AddProduct />} />
            {/* 변경 예정:  profile/{id} */}
            <Route path="profile/1234" element={<YourProfile />} />
          </Route>
          <Route path="/post">
            <Route index element={<PostDetail />} />
            <Route path="upload" element={<Upload />} />
          </Route>
          <Route path="/chat">
            <Route index element={<ChatList />} />
            {/* 변경 예정:  chat/{id} */}
            <Route path="1234" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
