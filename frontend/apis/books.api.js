import axios from "axios";
import { SERVER_URL } from "./config.api";

const getALlBooks = async () => {
    const res = await axios.get(`${SERVER_URL}/books`);

    if (res?.data?.status !== 200) throw new Error(res.data.message);

    return res?.data?.metadata;
};

export { getALlBooks };
