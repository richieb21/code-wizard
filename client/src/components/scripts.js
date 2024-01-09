function generateID() {
    const timestamp = Date.now()
    const randomNum = Math.random()
    const hexaNum = randomNum.toString(16)

    return `id-${timestamp}-${hexaNum}`;
}

export default generateID;
