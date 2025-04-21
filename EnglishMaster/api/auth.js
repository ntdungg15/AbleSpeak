
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
  


export const register = async (name, email, password, phone) => {
    // Dummy check: nếu email đã tồn tại thì coi như thất bại
    if (email !== "test@gmail.com") {
        return {
            error: "Email already exists",
        };
    }

    // Dummy response thành công
    return {
        token: "0987654321",
        userInfo: {
            id: 2,
            name,
            email,
            phone,
        }
    };
};
