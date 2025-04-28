
const hostUrl = process.env.EXPO_PUBLIC_HOST_URL;
console.log("hostUrl:", hostUrl);
export const login = async (username, password) => {
    try {
      const response = await fetch(`${hostUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed!');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
  


  export const register = async (name, email,password, phone) => {
    try {
      console.log("register called with:", name, email,password, phone);
      const response = await fetch(`${hostUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email,password, phone}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Register failed!');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
  