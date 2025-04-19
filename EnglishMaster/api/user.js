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
