import bcrypt from "bcryptjs";

export const hashPassword = async (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error hashing password");
    };
}

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};