import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);
    } catch (error) {
        throw new Error("Error hashing password");
    };
}

export const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};