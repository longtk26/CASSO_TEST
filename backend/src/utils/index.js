const getUniqueNumber = () => {
    const uniqueNumbers = new Set();
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 1000); // Thay đổi 1000 thành giới hạn số của bạn
    } while (uniqueNumbers.has(randomNumber));

    uniqueNumbers.add(randomNumber);
    return randomNumber;
};

export { getUniqueNumber };
