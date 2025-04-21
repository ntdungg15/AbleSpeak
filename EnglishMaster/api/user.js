
const hostUrl = process.env.EXPO_PUBLIC_HOST_URL;

export const getUserInfo = async (name, token) => {
  try {
    const response = await fetch(`${hostUrl}/user/userInfo?username=${name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Kiểm tra mã trạng thái của response
    if (!response.ok) {
      const errorText = await response.text();  // Đọc phản hồi dạng văn bản nếu không phải JSON
      console.error("Error response:", errorText);
      throw new Error('Failed to fetch user info');
    }

    // Nếu response hợp lệ, parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getUserInfo error:", error);
    return { error: error.message };  // Trả về thông báo lỗi
  }
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
  