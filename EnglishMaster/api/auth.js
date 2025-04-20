



export const login = (email, password) => {
    // const response = await fetch('https://api.example.com/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    // });

    // if (!response.ok) {
    //     throw new Error('Login failed!');
    // }
    if (email === "test@gmail.com" && password === "123456") {
        return {
            token: "1234567890",
            userInfo: {
                id: 1,
                name: "John Doe",
                email: "test@gmail.com",
                phone: "123456789",
            }
        };
    }
    return {
        error : "Invalid credentials"
    }

    // const data = await response.json();
    // return data;
}

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
