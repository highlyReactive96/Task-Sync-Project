import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const NavigatetoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div>
      <p>Registration successful! Redirecting to login page...</p>
    </div>
  );
};
 export default NavigatetoLogin;