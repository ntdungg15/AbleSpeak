import { useSelector } from "react-redux";

const user = useSelector
export const getUserInfo = (email, token) => {
    // Đây là đoạn fetch thật (hiện đang comment lại để dùng dummy)
    // const response = await fetch('https://api.example.com/user', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //     },
    // });
    // if (!response.ok) {
    //     throw new Error('Failed to fetch user info');
    // }
    // const data = await response.json();
    // return data;

    // Dummy data
    console.log("email :" + email);
    console.log("token :" + token);
    if (email === "test@gmail.com" && token === "1234567890") {
        return {
            id: 1,
            name: "John Doe",
            email: "test@gmail.com",
            phone: "123456789",
            token: token
        };
    }

    return {
        error: "Invalid token"
    };
};
export const getRelationship = (email) => {
    // Dummy data
    console.log("email:", email);
    return {
      email: "test@gmail.com",
      phone: "123456789",
      relationship: {
        Following: [
          {
            id: 1,
            name: "Hoang",
            email: "hoang@gmail.com",
            avtLink: "https://randomuser.me/api/portraits/men/1.jpg",  // Link ảnh avatar thật
          },
          {
            id: 2,
            name: "Nam",
            email: "nam@gmail.com",
            avtLink: "https://randomuser.me/api/portraits/men/2.jpg",  // Link ảnh avatar thật
          },
        ],
        Followers: [
          {
            id: 3,
            name: "Linh",
            email: "linh@gmail.com",
            avtLink: "https://randomuser.me/api/portraits/women/3.jpg",  // Link ảnh avatar thật
          },
          {
            id: 4,
            name: "Tuan",
            email: "tuan@gmail.com",
            avtLink: "https://randomuser.me/api/portraits/men/4.jpg",  // Link ảnh avatar thật
          },
        ],
      },
    };
  };
  