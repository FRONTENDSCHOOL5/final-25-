import { useNavigate, useLocation } from 'react-router-dom';

function useGoBack() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return goBack;
}

export default useGoBack;
